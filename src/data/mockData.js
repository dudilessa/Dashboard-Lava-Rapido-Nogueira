// Dados FICTÍCIOS — servem só para testar a interatividade do layout.
// Quando o modelo financeiro real estiver pronto, troque os valores
// default e a lógica de projetarReceitaEbitdaMock() por baixo. Os componentes
// que consomem isso (CardMetrica, GraficoReceita, GraficoEbitda) não
// precisam mudar.

export const anos = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

export const premissasDefault = {
  wacc: 0.15,           // taxa de desconto
  crescimentoReceita: 0.10, // crescimento anual da receita
  perpetuidadeG: 0.03,  // crescimento na perpetuidade
  comInvestimento: true, // toggle: cenário com ou sem investimento
  dividaLiquida: 0,     // abatida do Enterprise Value para chegar no Equity Value
};

const RECEITA_BASE_2026 = 480000; // R$/ano, ponto de partida fictício
const MARGEM_EBITDA = 0.22;

// Projeção fictícia de receita/EBITDA.
function projetarReceitaEbitdaMock(premissas) {
  const { crescimentoReceita, comInvestimento } = premissas;
  const fatorInvestimento = comInvestimento ? 1 : 0.4; // "sem investimento" cresce bem menos

  const receitaPorAno = anos.map((_, i) => {
    const crescimentoEfetivo = crescimentoReceita * fatorInvestimento;
    return RECEITA_BASE_2026 * Math.pow(1 + crescimentoEfetivo, i);
  });

  const ebitdaPorAno = receitaPorAno.map((r) => r * MARGEM_EBITDA);

  return { receitaPorAno, ebitdaPorAno };
}

// Fórmula simplificada só para demonstração — não é o modelo real do Nogueira.
export function calcularMetricas({ anosProjecao, receitaPorAno, ebitdaPorAno, premissas }) {
  const { wacc, crescimentoReceita, perpetuidadeG, comInvestimento, dividaLiquida = 0 } = premissas;
  const fatorInvestimento = comInvestimento ? 1 : 0.4;

  // VPL simplificado: soma do EBITDA descontado a WACC
  const vplOperacional = ebitdaPorAno.reduce(
    (acc, ebitda, i) => acc + ebitda / Math.pow(1 + wacc, i + 1),
    0
  );

  // Valor terminal (perpetuidade de Gordon) descontado a valor presente
  const ebitdaFinal = ebitdaPorAno[ebitdaPorAno.length - 1];
  const valorTerminal = (ebitdaFinal * (1 + perpetuidadeG)) / (wacc - perpetuidadeG);
  const valorTerminalDescontado = valorTerminal / Math.pow(1 + wacc, anosProjecao.length);

  const enterpriseValue = vplOperacional + valorTerminalDescontado;
  const equityValue = enterpriseValue - dividaLiquida;
  const tir = crescimentoReceita * fatorInvestimento + wacc * 0.3; // aproximação só para demo

  return {
    receitaPorAno,
    ebitdaPorAno,
    enterpriseValue,
    equityValue,
    vplOperacional,
    tir,
  };
}

export function calcularProjecao(premissas) {
  const { receitaPorAno, ebitdaPorAno } = projetarReceitaEbitdaMock(premissas);
  return calcularMetricas({ anosProjecao: anos, receitaPorAno, ebitdaPorAno, premissas });
}
