// Dados extraídos de "Cópia Modelo Claude Code.xlsx" (abas Model, Valuation).
// Séries históricas (2015-2025) e projetadas (2026-2031), consolidando as
// operações de Claudemir (pessoa física) e da Empresa. Valores em R$ (reais).

export const anos = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

export const anosProjecao = [2026, 2027, 2028, 2029, 2030, 2031];

export const dre = {
  receitaBruta: [490112, 504322, 495550, 468438, 442704, 356349, 403942, 398406, 372588, 345060, 328251, 324800, 265465, 435901, 598694, 735940, 845180],
  deducoes: [-48525, -45904, -41826, -36772, -33317, -24251, -27059, -25902, -23010, -20854, -19894, -19791, -16103, -26473, -36385, -44688, -51339],
  receitaLiquida: [441587, 458418, 453724, 431666, 409387, 332098, 376883, 372504, 349578, 324206, 308357, 305009, 249362, 409427, 562309, 691253, 793841],
  csp: [-287634, -309689, -301722, -298405, -280030, -255525, -263828, -277726, -251759, -252469, -255163, -253667, -274366, -290734, -307851, -324096, -339357],
  lucroBruto: [153953, 148729, 152002, 133261, 129357, 76573, 113055, 94778, 97819, 71737, 53194, 51342, -25004, 118694, 254457, 367157, 454485],
  opex: [-113065, -114469, -116845, -103308, -100620, -95268, -104020, -103874, -100651, -98898, -96761, -93632, -57966, -139476, -157742, -177426, -196828],
  ebitda: [52236, 46990, 49735, 43929, 43822, -1283, 25808, 7894, 12576, -11088, -28306, -27626, -47309, 34643, 168310, 278839, 363920],
  depreciacaoAmortizacao: [-11348, -12730, -14578, -13976, -15085, -17412, -16773, -16990, -15408, -16073, -15261, -14664, -35661, -55426, -71594, -89108, -106263],
  ebit: [40888, 34260, 35157, 29953, 28737, -18695, 9035, -9096, -2832, -27161, -43567, -42290, -82970, -20782, 96715, 189731, 257657],
  despesasFinanceiras: [-10022, -10397, -10154, -9370, -8813, -7389, -8241, -8121, -7626, -7110, -6716, -3412, -18900, -19785, -80960, -144375, -193896],
  receitasFinanceiras: [5280, 5040, 4675, 3025, 2700, 1300, 1593, 5445, 6000, 4750, 6000, 6000, 5557, 5809, 5789, 5561, 5582],
  resultadoAntesIR: [36146, 28902, 29674, 23611, 22622, -24785, 2389, -11767, -4464, -29519, -44280, -46524, -105312, -44081, 11895, 40931, 59008],
  irCsll: [0, -4177, -38493, -49154, -57237, -56474, -81271, -90108, -95219, -99871, -105084, -87634, -6053, -9939, -13650, -16779, -19270],
  resultadoLiquido: [36146, 28902, 29674, 23611, 22622, -24785, 2389, -11767, -4464, -29519, -44280, -51930, -99260, -34143, 25546, 57710, 78278],
};

export const balanco = {
  ativoCirculante: [80628, 98821, 101130, 101147, 98117, 86226, 95635, 98533, 96905, 96215, 96182, 99766, 91048, 66785, 409547, 730472, 1012590],
  ativoNaoCirculante: [57978, 82748, 70370, 74192, 93907, 80396, 79124, 76434, 74926, 67852, 56492, 49160, 49160, 49160, 49160, 49160, 49160],
  ativoTotal: [138606, 181569, 171500, 175339, 192024, 166622, 174759, 174967, 171831, 164067, 152674, 148926, 140208, 115945, 458707, 779632, 1061750],
  passivoCirculante: [44046, 49760, 52252, 58003, 62249, 68782, 74905, 86123, 83979, 90521, 97982, 113065, 113607, 137271, 160421, 180472, 197134],
  passivoNaoCirculante: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90000, 76215, 370281, 613446, 800623],
  patrimonioLiquido: [94559, 131808, 119250, 117338, 129778, 97839, 99854, 88843, 87850, 73545, 54692, 35863, -63397, -97539, -71994, -14283, 63995],
  passivoTotal: [138605, 181568, 171502, 175341, 192027, 166621, 174759, 174966, 171829, 164066, 152674, 148928, 140210, 115947, 458709, 779634, 1061752],
};

export const fluxoCaixa = {
  lucroLiquido: [36146, 28902, 29674, 23611, 22622, -24785, 2389, -11767, -4464, -29519, -44280, -51930, -99260, -34143, 25546, 57710, 78278],
  depreciacaoAmortizacao: [11348, 12730, 14578, 13976, 15085, 17412, 16773, 16990, 15408, 16073, 15261, 14664, 35661, 55426, 71594, 89108, 106263],
  cfo: [47978, 41708, 43989, 41925, 42673, 4285, 19047, 13119, 9727, -6672, -21742, -25697, -58365, 26685, 102754, 151965, 189199],
  capex: [0, -36118, -352, -18400, -33691, -1574, -16140, -14083, -15482, -8334, -4713, -7929, -35661, -55426, -71594, -89108, -106263],
  cfi: [0, -36118, -352, -18400, -33691, -1574, -16140, -14083, -15482, -8334, -4713, -7929, -35661, -55426, -71594, -89108, -106263],
  cff: [0, 8346, -42232, -25523, -10181, -7153, -374, 756, 3471, 15214, 25427, 7136, 90000, -13785, 294066, 243164, 187178],
  caixaInicial: [0, 47978, 61914, 63319, 61321, 60122, 55680, 58213, 58005, 55721, 55929, 54901, 51000, 46974, 4449, 329675, 635696],
  variacaoCaixa: [47978, 13936, 1405, -1998, -1199, -4442, 2533, -208, -2284, 208, -1028, -26490, -4026, -42526, 325226, 306021, 270114],
  caixaFinal: [47978, 61914, 63319, 61321, 60122, 55680, 58213, 58005, 55721, 55929, 54901, 28411, 46974, 4449, 329675, 635696, 905810],
};

// Resultado do DCF da aba "Valuation" (cenário base do modelo, com investimento).
export const valuationBase = {
  wacc: 0.25027532332486613,
  perpetuidadeG: 0.035,
  enterpriseValue: 82578,
  equityValue: 79008,
  vplOperacional: 82578,
  tir: 0.5279608132371714,
  dividaLiquida: 3570,
};

export const premissasDefault = {
  wacc: 0.25,           // taxa de desconto (WACC calculado na aba Valuation)
  crescimentoReceita: 0.21, // CAGR da receita líquida projetada 2026-2031
  perpetuidadeG: 0.035,  // crescimento na perpetuidade (aba Valuation)
  comInvestimento: true, // toggle: cenário com ou sem investimento
  dividaLiquida: valuationBase.dividaLiquida,
};

function ehCenarioBase(premissas) {
  return (
    premissas.wacc === premissasDefault.wacc &&
    premissas.crescimentoReceita === premissasDefault.crescimentoReceita &&
    premissas.perpetuidadeG === premissasDefault.perpetuidadeG &&
    premissas.comInvestimento === premissasDefault.comInvestimento
  );
}

// Fora do cenário base, os sliders simulam um "e se": a receita líquida de 2026
// (ponto real da planilha) é projetada com a taxa de crescimento escolhida, e a
// margem EBITDA de cada ano da planilha é preservada (o formato real da curva —
// margem negativa nos anos de investimento pesado, recuperando depois — se
// mantém, só a inclinação da receita muda).
function projetarCenarioSimulado(premissas) {
  const { crescimentoReceita, comInvestimento } = premissas;
  const fatorInvestimento = comInvestimento ? 1 : 0.4;

  const receitaBase = dre.receitaLiquida[anos.indexOf(anosProjecao[0])];
  const margens = anosProjecao.map((ano) => {
    const i = anos.indexOf(ano);
    return dre.ebitda[i] / dre.receitaLiquida[i];
  });

  const receitaPorAno = anosProjecao.map(
    (_, i) => receitaBase * Math.pow(1 + crescimentoReceita * fatorInvestimento, i)
  );
  const ebitdaPorAno = receitaPorAno.map((receita, i) => receita * margens[i]);

  return { receitaPorAno, ebitdaPorAno };
}

// VPL simplificado (soma do EBITDA descontado a WACC) + valor terminal (Gordon).
// É uma aproximação do modelo real (que desconta FCFF ano a ano) — usada só
// quando o usuário se afasta do cenário base via os sliders.
function calcularMetricasSimuladas({ receitaPorAno, ebitdaPorAno, premissas }) {
  const { wacc, perpetuidadeG, comInvestimento, crescimentoReceita, dividaLiquida = premissasDefault.dividaLiquida } = premissas;
  const fatorInvestimento = comInvestimento ? 1 : 0.4;

  const vplOperacional = ebitdaPorAno.reduce(
    (acc, ebitda, i) => acc + ebitda / Math.pow(1 + wacc, i + 1),
    0
  );

  const ebitdaFinal = ebitdaPorAno[ebitdaPorAno.length - 1];
  const valorTerminal = (ebitdaFinal * (1 + perpetuidadeG)) / (wacc - perpetuidadeG);
  const valorTerminalDescontado = valorTerminal / Math.pow(1 + wacc, anosProjecao.length);

  const enterpriseValue = vplOperacional + valorTerminalDescontado;
  const equityValue = enterpriseValue - dividaLiquida;
  const tir = wacc + crescimentoReceita * fatorInvestimento * 0.5;

  return { receitaPorAno, ebitdaPorAno, enterpriseValue, equityValue, vplOperacional, tir };
}

export function calcularProjecao(premissas) {
  if (ehCenarioBase(premissas)) {
    return {
      receitaPorAno: anosProjecao.map((ano) => dre.receitaLiquida[anos.indexOf(ano)]),
      ebitdaPorAno: anosProjecao.map((ano) => dre.ebitda[anos.indexOf(ano)]),
      enterpriseValue: valuationBase.enterpriseValue,
      equityValue: valuationBase.equityValue,
      vplOperacional: valuationBase.vplOperacional,
      tir: valuationBase.tir,
      cenarioBase: true,
    };
  }

  const { receitaPorAno, ebitdaPorAno } = projetarCenarioSimulado(premissas);
  return {
    ...calcularMetricasSimuladas({ receitaPorAno, ebitdaPorAno, premissas }),
    cenarioBase: false,
  };
}
