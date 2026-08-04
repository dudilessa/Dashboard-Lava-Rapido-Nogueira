// Dados FICTÍCIOS — servem só para testar a interatividade do layout.
// Quando o modelo financeiro real estiver pronto, troque os valores
// default e a lógica de calcularProjecao() por baixo. Os componentes
// que consomem isso (CardMetrica, GraficoReceita, GraficoEbitda) não
// precisam mudar.

export const anos = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

export const premissasDefault = {
  wacc: 0.15,           // taxa de desconto
  crescimentoReceita: 0.10, // crescimento anual da receita
  perpetuidadeG: 0.03,  // crescimento na perpetuidade
  comInvestimento: true, // toggle: cenário com ou sem investimento
};

const RECEITA_BASE_2026 = 480000; // R$/ano, ponto de partida fictício
const MARGEM_EBITDA = 0.22;

// Fórmula simplificada só para demonstração — não é o modelo real do Nogueira.
export function calcularProjecao(premissas) {
  const { wacc, crescimentoReceita, perpetuidadeG, comInvestimento } = premissas;
  const fatorInvestimento = comInvestimento ? 1 : 0.4; // "sem investimento" cresce bem menos

  const receitaPorAno = anos.map((ano, i) => {
    const crescimentoEfetivo = crescimentoReceita * fatorInvestimento;
    return RECEITA_BASE_2026 * Math.pow(1 + crescimentoEfetivo, i);
  });

  const ebitdaPorAno = receitaPorAno.map((r) => r * MARGEM_EBITDA);

  // VPL simplificado: soma do EBITDA descontado a WACC
  const vplOperacional = ebitdaPorAno.reduce(
    (acc, ebitda, i) => acc + ebitda / Math.pow(1 + wacc, i + 1),
    0
  );

  // Valor terminal (perpetuidade de Gordon) descontado a valor presente
  const ebitdaFinal = ebitdaPorAno[ebitdaPorAno.length - 1];
  const valorTerminal = (ebitdaFinal * (1 + perpetuidadeG)) / (wacc - perpetuidadeG);
  const valorTerminalDescontado = valorTerminal / Math.pow(1 + wacc, anos.length);

  const enterpriseValue = vplOperacional + valorTerminalDescontado;
  const equityValue = enterpriseValue; // fictício: sem dívida líquida por ora
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
