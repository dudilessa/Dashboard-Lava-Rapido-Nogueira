import { useState } from 'react';
import { anos, dre, balanco, fluxoCaixa } from '../data/financialData';

const ANO_INICIO_PROJECAO = 2026;

const ABAS_DEMONSTRATIVO = [
  { id: 'dre', rotulo: 'DRE' },
  { id: 'balanco', rotulo: 'Balanço patrimonial' },
  { id: 'fluxo', rotulo: 'Fluxo de caixa' },
];

const LINHAS = {
  dre: [
    { label: 'Receita bruta', dados: dre.receitaBruta },
    { label: '(-) Deduções da receita', dados: dre.deducoes },
    { label: 'Receita líquida', dados: dre.receitaLiquida, subtotal: true },
    { label: '(-) Custo dos serviços prestados', dados: dre.csp },
    { label: 'Lucro bruto', dados: dre.lucroBruto, subtotal: true },
    { label: '(-) Despesas operacionais', dados: dre.opex },
    { label: 'EBITDA', dados: dre.ebitda, destaque: true },
    { label: '(-) Depreciação e amortização', dados: dre.depreciacaoAmortizacao },
    { label: 'EBIT', dados: dre.ebit, subtotal: true },
    { label: '(-) Despesas financeiras', dados: dre.despesasFinanceiras },
    { label: '(+) Receitas financeiras', dados: dre.receitasFinanceiras },
    { label: 'Resultado antes do IR e CSLL', dados: dre.resultadoAntesIR, subtotal: true },
    { label: '(-) IR e CSLL', dados: dre.irCsll },
    { label: 'Resultado líquido do período', dados: dre.resultadoLiquido, destaque: true },
  ],
  balanco: [
    { label: 'Ativo circulante', dados: balanco.ativoCirculante },
    { label: 'Ativo não circulante', dados: balanco.ativoNaoCirculante },
    { label: 'Ativo total', dados: balanco.ativoTotal, destaque: true },
    { label: 'Passivo circulante', dados: balanco.passivoCirculante },
    { label: 'Passivo não circulante (empréstimos)', dados: balanco.passivoNaoCirculante },
    { label: 'Patrimônio líquido', dados: balanco.patrimonioLiquido, subtotal: true },
    { label: 'Passivo + patrimônio líquido', dados: balanco.passivoTotal, destaque: true },
  ],
  fluxo: [
    { label: 'Lucro líquido', dados: fluxoCaixa.lucroLiquido },
    { label: '(+) Depreciação e amortização', dados: fluxoCaixa.depreciacaoAmortizacao },
    { label: 'Fluxo de caixa operacional (CFO)', dados: fluxoCaixa.cfo, subtotal: true },
    { label: '(-) Capex', dados: fluxoCaixa.capex },
    { label: 'Fluxo de caixa de investimento (CFI)', dados: fluxoCaixa.cfi, subtotal: true },
    { label: 'Fluxo de caixa de financiamento (CFF)', dados: fluxoCaixa.cff, subtotal: true },
    { label: 'Caixa inicial', dados: fluxoCaixa.caixaInicial },
    { label: 'Variação de caixa', dados: fluxoCaixa.variacaoCaixa },
    { label: 'Caixa final', dados: fluxoCaixa.caixaFinal, destaque: true },
  ],
};

function formatarMil(valor) {
  const emMil = valor / 1000;
  const formatado = Math.abs(emMil).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  return valor < 0 ? `(${formatado})` : formatado;
}

function DemonstrativosFinanceiros() {
  const [abaAtiva, setAbaAtiva] = useState('dre');
  const linhas = LINHAS[abaAtiva];

  return (
    <div className="demonstrativos">
      <div className="demonstrativos-topo">
        <nav className="sub-abas-nav">
          {ABAS_DEMONSTRATIVO.map((aba) => (
            <button
              key={aba.id}
              className={abaAtiva === aba.id ? 'ativo' : ''}
              onClick={() => setAbaAtiva(aba.id)}
            >
              {aba.rotulo}
            </button>
          ))}
        </nav>
        <p className="demonstrativos-nota">
          Valores em R$ mil · consolidado (pessoa física + empresa) · fonte: planilha do modelo · anos a partir de {ANO_INICIO_PROJECAO} são projeção
        </p>
      </div>

      <div className="tabela-demonstrativo-wrapper">
        <table className="tabela-demonstrativo">
          <thead>
            <tr>
              <th className="coluna-rotulo">Descrição</th>
              {anos.map((ano) => (
                <th key={ano} className={ano >= ANO_INICIO_PROJECAO ? 'projetado' : ''}>
                  {ano}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha) => (
              <tr key={linha.label} className={linha.destaque ? 'destaque' : linha.subtotal ? 'subtotal' : ''}>
                <td className="coluna-rotulo">{linha.label}</td>
                {linha.dados.map((valor, i) => (
                  <td key={anos[i]} className={valor < 0 ? 'negativo' : ''}>
                    {formatarMil(valor)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DemonstrativosFinanceiros;
