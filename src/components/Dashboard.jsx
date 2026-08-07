import { useMemo, useState } from 'react';
import CardMetrica from './CardMetrica';
import SliderPremissa from './SliderPremissa';
import GraficoReceita from './GraficoReceita';
import GraficoEbitda from './GraficoEbitda';
import { anos as anosMock, premissasDefault, calcularProjecao } from '../data/mockData';

function Dashboard({ onSair }) {
  const [premissas, setPremissas] = useState(premissasDefault);

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

      <div className="grade-cards">
        <CardMetrica titulo="Enterprise Value" valor={resultado.enterpriseValue} legenda="VPL da firma" />
        <CardMetrica titulo="Equity Value" valor={resultado.equityValue} legenda="EV - dívida líquida" />
        <CardMetrica titulo="VPL Operacional" valor={resultado.vplOperacional} legenda="Soma EBITDA descontado" />
        <CardMetrica titulo="TIR" valor={resultado.tir} formato="percentual" legenda="estimativa" />
      </div>

      <div className="grade-graficos">
        <GraficoReceita anos={anosMock} receitaPorAno={resultado.receitaPorAno} />
        <GraficoEbitda anos={anosMock} ebitdaPorAno={resultado.ebitdaPorAno} />
      </div>
    </div>
  );
}

export default Dashboard;
