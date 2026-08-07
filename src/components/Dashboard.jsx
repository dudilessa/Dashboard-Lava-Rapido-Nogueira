import { useMemo, useState } from 'react';
import CardMetrica from './CardMetrica';
import SliderPremissa from './SliderPremissa';
import GraficoReceita from './GraficoReceita';
import GraficoEbitda from './GraficoEbitda';
import DemonstrativosFinanceiros from './DemonstrativosFinanceiros';
import { anosProjecao, premissasDefault, calcularProjecao } from '../data/financialData';

const ABAS = [
  { id: 'visao-geral', rotulo: 'Visão geral' },
  { id: 'demonstrativos', rotulo: 'Demonstrativos financeiros' },
];

function Dashboard({ onSair }) {
  const [premissas, setPremissas] = useState(premissasDefault);
  const [abaAtiva, setAbaAtiva] = useState('visao-geral');

  const resultado = useMemo(() => calcularProjecao(premissas), [premissas]);

  function atualizarPremissa(campo, valor) {
    setPremissas((prev) => ({ ...prev, [campo]: valor }));
  }

  return (
    <div className="tela-dashboard">
      <header>
        <div className="header-marca">
          <img src="/logo.png" alt="Lava-Rápido Nogueira" />
          <h1>Dashboard financeiro</h1>
        </div>
        <button onClick={onSair}>Sair</button>
      </header>

      <nav className="abas-nav">
        {ABAS.map((aba) => (
          <button
            key={aba.id}
            className={abaAtiva === aba.id ? 'ativo' : ''}
            onClick={() => setAbaAtiva(aba.id)}
          >
            {aba.rotulo}
          </button>
        ))}
      </nav>

      {abaAtiva === 'visao-geral' && (
        <>
          <div className="barra-controles">
            <div className="toggle-cenario">
              <button
                className={premissas.comInvestimento ? 'ativo' : ''}
                onClick={() => atualizarPremissa('comInvestimento', true)}
              >
                Com investimento
              </button>
              <button
                className={!premissas.comInvestimento ? 'ativo' : ''}
                onClick={() => atualizarPremissa('comInvestimento', false)}
              >
                Sem investimento
              </button>
            </div>

            <SliderPremissa
              label="WACC"
              valor={premissas.wacc}
              min={0.05}
              max={0.35}
              step={0.01}
              onChange={(v) => atualizarPremissa('wacc', v)}
            />
            <SliderPremissa
              label="Crescimento receita"
              valor={premissas.crescimentoReceita}
              min={0.02}
              max={0.30}
              step={0.01}
              onChange={(v) => atualizarPremissa('crescimentoReceita', v)}
            />
            <SliderPremissa
              label="Perpetuidade (g)"
              valor={premissas.perpetuidadeG}
              min={0.01}
              max={0.06}
              step={0.005}
              onChange={(v) => atualizarPremissa('perpetuidadeG', v)}
            />
          </div>

          <p className={`aviso-cenario ${resultado.cenarioBase ? 'base' : 'simulado'}`}>
            {resultado.cenarioBase
              ? 'Cenário base — valores do DCF da planilha (2026-2031)'
              : 'Simulação aproximada — premissas alteradas em relação à planilha'}
          </p>

          <div className="grade-cards">
            <CardMetrica
              titulo="Enterprise Value"
              valor={resultado.enterpriseValue}
              legenda={resultado.cenarioBase ? 'VPL dos FCFF da planilha' : 'VPL da firma (aproximado)'}
            />
            <CardMetrica titulo="Equity Value" valor={resultado.equityValue} legenda="EV - dívida líquida" />
            <CardMetrica
              titulo="VPL Operacional"
              valor={resultado.vplOperacional}
              legenda={resultado.cenarioBase ? "Soma dos FCFF's descontados" : 'Soma EBITDA descontado (aproximado)'}
            />
            <CardMetrica titulo="TIR" valor={resultado.tir} formato="percentual" legenda={resultado.cenarioBase ? 'planilha' : 'estimativa'} />
          </div>

          <div className="grade-graficos">
            <GraficoReceita anos={anosProjecao} receitaPorAno={resultado.receitaPorAno} />
            <GraficoEbitda anos={anosProjecao} ebitdaPorAno={resultado.ebitdaPorAno} />
          </div>
        </>
      )}

      {abaAtiva === 'demonstrativos' && <DemonstrativosFinanceiros />}
    </div>
  );
}

export default Dashboard;
