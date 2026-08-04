// Lê planilhas (.xlsx, .xls, .csv) enviadas pelo usuário e as transforma no
// formato que Dashboard.jsx precisa: { anos, receitaPorAno, ebitdaPorAno, premissas }.
//
// Formato esperado na primeira aba (ou numa aba chamada "Dados"/"Projeção"):
//   Ano | Receita | EBITDA
//   2026 | 480000 | 105600
//   ...
//
// Opcionalmente, uma aba chamada "Premissas" com duas colunas (parâmetro/valor):
//   WACC              | 0.15
//   Crescimento Receita | 0.10
//   Perpetuidade (G)  | 0.03
//   Dívida Líquida    | 0

export class PlanilhaError extends Error {}

const EXTENSOES_ACEITAS = ['.xlsx', '.xls', '.csv'];

const CHAVES_ANO = ['ano', 'ano fiscal', 'exercicio', 'exercício', 'year'];
const CHAVES_RECEITA = ['receita', 'receita (r$)', 'receita anual', 'receita liquida', 'receita líquida', 'revenue'];
const CHAVES_EBITDA = ['ebitda', 'ebitda (r$)', 'ebitda anual'];

const CHAVES_PREMISSA = {
  wacc: ['wacc', 'taxa de desconto'],
  crescimentoReceita: ['crescimento receita', 'crescimento da receita', 'crescimento anual da receita'],
  perpetuidadeG: ['perpetuidade', 'perpetuidade (g)', 'perpetuidade g', 'crescimento na perpetuidade', 'g de perpetuidade'],
  dividaLiquida: ['divida liquida', 'dívida líquida', 'divida líquida', 'net debt'],
  comInvestimento: ['com investimento', 'cenario', 'cenário', 'investimento'],
};

const REGEX_DIACRITICOS = new RegExp('[̀-ͯ]', 'g');

function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(REGEX_DIACRITICOS, '')
    .trim()
    .toLowerCase();
}

function encontrarColuna(headerRow, chaves) {
  for (let i = 0; i < headerRow.length; i++) {
    if (chaves.includes(normalizar(headerRow[i]))) return i;
  }
  return -1;
}

function encontrarAba(workbook, pistas) {
  return workbook.SheetNames.find((nome) =>
    pistas.some((pista) => normalizar(nome).includes(pista))
  );
}

function lerLinhas(XLSX, workbook, nomeAba) {
  const aba = workbook.Sheets[nomeAba];
  return XLSX.utils.sheet_to_json(aba, { header: 1, raw: true, blankrows: false });
}

function lerDados(XLSX, workbook) {
  const nomeAba = encontrarAba(workbook, ['dados', 'projec']) || workbook.SheetNames[0];
  const linhas = lerLinhas(XLSX, workbook, nomeAba);

  if (!linhas || linhas.length < 2) {
    throw new PlanilhaError('A planilha está vazia ou não tem linhas de dados suficientes.');
  }

  const header = linhas[0];
  const idxAno = encontrarColuna(header, CHAVES_ANO);
  const idxReceita = encontrarColuna(header, CHAVES_RECEITA);
  const idxEbitda = encontrarColuna(header, CHAVES_EBITDA);

  if (idxAno === -1 || idxReceita === -1 || idxEbitda === -1) {
    throw new PlanilhaError(
      `Não encontrei as colunas "Ano", "Receita" e "EBITDA" na primeira linha da aba "${nomeAba}". ` +
      'Confira o formato esperado antes de tentar novamente.'
    );
  }

  const anos = [];
  const receitaPorAno = [];
  const ebitdaPorAno = [];

  for (let i = 1; i < linhas.length; i++) {
    const linha = linhas[i];
    if (!linha || linha[idxAno] === undefined || linha[idxAno] === '') continue;

    const ano = Number(linha[idxAno]);
    const receita = Number(linha[idxReceita]);
    const ebitda = Number(linha[idxEbitda]);

    if (!Number.isFinite(ano) || !Number.isFinite(receita) || !Number.isFinite(ebitda)) {
      throw new PlanilhaError(`Linha ${i + 1} da aba "${nomeAba}": valores de Ano, Receita ou EBITDA inválidos.`);
    }

    anos.push(ano);
    receitaPorAno.push(receita);
    ebitdaPorAno.push(ebitda);
  }

  if (anos.length === 0) {
    throw new PlanilhaError(`Nenhuma linha de dados válida foi encontrada na aba "${nomeAba}".`);
  }

  return { anos, receitaPorAno, ebitdaPorAno };
}

function lerPremissas(XLSX, workbook) {
  const nomeAba = encontrarAba(workbook, ['premiss']);
  if (!nomeAba) return null;

  const linhas = lerLinhas(XLSX, workbook, nomeAba);
  if (!linhas || linhas.length < 2) return null;

  const premissas = {};

  for (let i = 1; i < linhas.length; i++) {
    const [chaveBruta, valorBruto] = linhas[i] ?? [];
    if (chaveBruta == null || valorBruto === undefined || valorBruto === '') continue;

    const chaveNormalizada = normalizar(chaveBruta);
    const campo = Object.entries(CHAVES_PREMISSA).find(([, sinonimos]) =>
      sinonimos.includes(chaveNormalizada)
    )?.[0];

    if (!campo) continue;

    if (campo === 'comInvestimento') {
      premissas[campo] = /^(sim|s|true|1|com)/.test(normalizar(valorBruto));
      continue;
    }

    const numero = Number(valorBruto);
    if (Number.isFinite(numero)) premissas[campo] = numero;
  }

  if (premissas.wacc !== undefined && (premissas.wacc <= 0 || premissas.wacc >= 1)) {
    throw new PlanilhaError(`Aba "${nomeAba}": WACC deve ser um valor entre 0 e 1 (ex.: 0.15 para 15%).`);
  }
  if (
    premissas.wacc !== undefined &&
    premissas.perpetuidadeG !== undefined &&
    premissas.perpetuidadeG >= premissas.wacc
  ) {
    throw new PlanilhaError(
      `Aba "${nomeAba}": a Perpetuidade (G) precisa ser menor que o WACC, senão o valor terminal não faz sentido.`
    );
  }

  return Object.keys(premissas).length > 0 ? premissas : null;
}

export function extensaoValida(nomeArquivo) {
  const nome = normalizar(nomeArquivo);
  return EXTENSOES_ACEITAS.some((ext) => nome.endsWith(ext));
}

export async function parsePlanilha(file) {
  if (!extensaoValida(file.name)) {
    throw new PlanilhaError('Formato não suportado. Envie um arquivo .xlsx, .xls ou .csv.');
  }

  const XLSX = await import('xlsx');

  let workbook;
  try {
    const buffer = await file.arrayBuffer();
    workbook = XLSX.read(buffer, { type: 'array' });
  } catch {
    throw new PlanilhaError('Não foi possível abrir esse arquivo. Verifique se ele não está corrompido.');
  }

  if (!workbook.SheetNames?.length) {
    throw new PlanilhaError('A planilha não contém nenhuma aba com dados.');
  }

  const { anos, receitaPorAno, ebitdaPorAno } = lerDados(XLSX, workbook);
  const premissas = lerPremissas(XLSX, workbook);

  return { anos, receitaPorAno, ebitdaPorAno, premissas };
}
