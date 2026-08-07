// Dados extraídos de "Fin_Capacitação Entrega Grupo 02.xlsx" (abas Model, Valuation).
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
  ativoCirculante: [80628, 98821, 101130, 101147, 98117, 86226, 95635, 98533, 96905, 96215, 96182, 99766, 38682, 66445, 480801, 886934, 1269515],
  ativoNaoCirculante: [57978, 82748, 70370, 74192, 93907, 80396, 79124, 76434, 74926, 67852, 56492, 49160, 101526, 49500, -22094, -107302, -207765],
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
  capex: [0, -36118, -352, -18400, -33691, -1574, -16140, -14083, -15482, -8334, -4713, -7929, -88027, -3400, 0, -3900, -5800],
  cfi: [0, -36118, -352, -18400, -33691, -1574, -16140, -14083, -15482, -8334, -4713, -7929, -88027, -3400, 0, -3900, -5800],
  cff: [0, 8346, -42232, -25523, -10181, -7153, -374, 756, 3471, 15214, 25427, 7136, 90000, -13785, 294066, 243164, 187178],
  caixaInicial: [0, 47978, 61914, 63319, 61321, 60122, 55680, 58213, 58005, 55721, 55929, 54901, 51000, -5392, 4108, 400929, 792158],
  variacaoCaixa: [47978, 13936, 1405, -1998, -1199, -4442, 2533, -208, -2284, 208, -1028, -26490, -56392, 9500, 396821, 391229, 370577],
  caixaFinal: [47978, 61914, 63319, 61321, 60122, 55680, 58213, 58005, 55721, 55929, 54901, 28411, -5392, 4108, 400929, 792158, 1162735],
};

// FCFF unlevered (aba Valuation, linha "FCFF (corrente)"): NOPAT (EBIT à
// alíquota teórica de desalavancagem) + D&A - Capex - ΔWK. É o fluxo que a
// própria planilha desconta no DCF — diferente do IR/CSLL efetivamente pago
// (Simples Nacional) que aparece na DRE, aqui usa-se uma alíquota teórica só
// para desalavancar o EBIT.
const ALIQUOTA_IR_DESALAVANCAGEM = 0.34;
const fcffHistoricoEProjetado = [38334, 1275, 35888, 10941, -7103, -8197, 4743, -9023, -3330, -15880, -24064, -25582, -119795, 54293, 150238, 222512, 279565];

// Resultado do DCF da aba "Valuation" (cenário base do modelo).
export const valuationBase = {
  wacc: 0.2930667480329336,
  perpetuidadeG: 0.035,
  enterpriseValue: 254686,
  equityValue: 195286,
  vplOperacional: 108781, // "VPL dos FCFF's" — soma dos FCFF descontados, SEM valor terminal
  tir: 0.6977359372275913,
  dividaLiquida: 59400,
};

export const premissasDefault = {
  // O slider de WACC parte do valor exato da planilha (não arredondado): como
  // não há mais fator de calibração, qualquer diferença aqui viraria um salto
  // no instante em que o slider sai da posição padrão.
  wacc: valuationBase.wacc,
  crescimentoReceita: 0.21, // CAGR da receita líquida projetada 2026-2031
  perpetuidadeG: 0.035,  // crescimento na perpetuidade (aba Valuation)
  dividaLiquida: valuationBase.dividaLiquida,
};

function ehCenarioBase(premissas) {
  return (
    premissas.wacc === premissasDefault.wacc &&
    premissas.crescimentoReceita === premissasDefault.crescimentoReceita &&
    premissas.perpetuidadeG === premissasDefault.perpetuidadeG
  );
}

// Séries reais da planilha para os anos projetados (2026-2031): receita,
// EBITDA, EBIT e o próprio FCFF unlevered usado no DCF real. É a base de tudo
// que os sliders simulam a partir daqui.
const indicesProjecao = anosProjecao.map((ano) => anos.indexOf(ano));
const receitaReal = indicesProjecao.map((i) => dre.receitaLiquida[i]);
const ebitdaReal = indicesProjecao.map((i) => dre.ebitda[i]);
const ebitReal = indicesProjecao.map((i) => dre.ebit[i]);
const fcffReal = indicesProjecao.map((i) => fcffHistoricoEProjetado[i]);

// O slider de crescimento não substitui a curva real por uma reta composta:
// ele reescala cada ano real pela razão entre a taxa escolhida e a taxa
// implícita no modelo (premissasDefault.crescimentoReceita), preservando o
// formato real do ciclo de investimento (o FCFF muito negativo em 2027, ano
// do grande aporte em CAPEX, recuperando depois) e só esticando/comprimindo
// o ritmo de crescimento.
function fatoresCrescimento(crescimentoReceita) {
  const razao = (1 + crescimentoReceita) / (1 + premissasDefault.crescimentoReceita);
  return anosProjecao.map((_, i) => Math.pow(razao, i));
}

function projetarFluxosReais(premissas) {
  const fatores = fatoresCrescimento(premissas.crescimentoReceita);
  return {
    receitaPorAno: receitaReal.map((v, i) => v * fatores[i]),
    ebitdaPorAno: ebitdaReal.map((v, i) => v * fatores[i]),
    ebitPorAno: ebitReal.map((v, i) => v * fatores[i]),
    fcffPorAno: fcffReal.map((v, i) => v * fatores[i]),
  };
}

// DCF real, igual ao da planilha: soma o FCFF descontado a WACC, valor
// terminal por Gordon sobre o NOPAT do último ano (não o FCFF cheio — na
// perpetuidade assume-se capex ≈ D&A e ΔWK ≈ 0, exatamente como a aba
// Valuation define "FCFF Perpetuidade"). Os sliders de WACC (mín. 5%) e
// perpetuidade (máx. 6%) podem se cruzar; o spread mínimo de 3 p.p. evita que
// o valor terminal exploda nesse canto do intervalo.
function descontarFluxos(fcffPorAno, ebitFinal, wacc, perpetuidadeG) {
  const vplOperacional = fcffPorAno.reduce(
    (acc, fcff, i) => acc + fcff / Math.pow(1 + wacc, i + 1),
    0
  );
  const gEfetivo = Math.min(perpetuidadeG, wacc - 0.03);
  const nopatFinal = ebitFinal * (1 - ALIQUOTA_IR_DESALAVANCAGEM);
  const valorTerminal = (nopatFinal * (1 + gEfetivo)) / (wacc - gEfetivo);
  const valorTerminalDescontado = valorTerminal / Math.pow(1 + wacc, fcffPorAno.length);
  return { vplOperacional, valorTerminalDescontado };
}

// TIR real: raiz por bisseção do próprio fluxo de FCFF (2026-2031, sem valor
// terminal — é assim que a aba Valuation calcula a TIR), em vez de uma
// fórmula linear arbitrária. Não depende de WACC nem de calibração: com o
// FCFF real, a fórmula já bate com o número da planilha no cenário padrão.
function calcularVPL(fluxos, taxa) {
  return fluxos.reduce((acc, fluxo, i) => acc + fluxo / Math.pow(1 + taxa, i + 1), 0);
}

function calcularTIR(fluxos) {
  let baixo = -0.9;
  let alto = 5;
  let vplBaixo = calcularVPL(fluxos, baixo);
  const vplAlto = calcularVPL(fluxos, alto);
  if (vplBaixo * vplAlto > 0) return null;

  for (let iter = 0; iter < 100; iter += 1) {
    const meio = (baixo + alto) / 2;
    const vplMeio = calcularVPL(fluxos, meio);
    if (Math.abs(vplMeio) < 1e-6) return meio;
    if ((vplMeio > 0) === (vplBaixo > 0)) {
      baixo = meio;
      vplBaixo = vplMeio;
    } else {
      alto = meio;
    }
  }
  return (baixo + alto) / 2;
}

function calcularMetricasSimuladas(premissas) {
  const { wacc, perpetuidadeG, dividaLiquida = premissasDefault.dividaLiquida } = premissas;
  const { receitaPorAno, ebitdaPorAno, ebitPorAno, fcffPorAno } = projetarFluxosReais(premissas);

  const { vplOperacional, valorTerminalDescontado } = descontarFluxos(
    fcffPorAno,
    ebitPorAno[ebitPorAno.length - 1],
    wacc,
    perpetuidadeG
  );
  const enterpriseValue = vplOperacional + valorTerminalDescontado;
  const equityValue = enterpriseValue - dividaLiquida;
  const tir = calcularTIR(fcffPorAno) ?? valuationBase.tir;

  return { receitaPorAno, ebitdaPorAno, enterpriseValue, equityValue, vplOperacional, tir };
}

export function calcularProjecao(premissas) {
  if (ehCenarioBase(premissas)) {
    return {
      receitaPorAno: receitaReal,
      ebitdaPorAno: ebitdaReal,
      enterpriseValue: valuationBase.enterpriseValue,
      equityValue: valuationBase.equityValue,
      vplOperacional: valuationBase.vplOperacional,
      tir: valuationBase.tir,
      cenarioBase: true,
    };
  }

  return {
    ...calcularMetricasSimuladas(premissas),
    cenarioBase: false,
  };
}
