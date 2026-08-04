import { useMemo, useRef, useState } from 'react';
import CardMetrica from './CardMetrica';
import SliderPremissa from './SliderPremissa';
import GraficoReceita from './GraficoReceita';
import GraficoEbitda from './GraficoEbitda';
import { anos as anosMock, premissasDefault, calcularProjecao, calcularMetricas } from '../data/mockData';
import { parsePlanilha, PlanilhaError } from '../utils/planilha';

function Dashboard({ onSair }) {
  const [premissas, setPremissas] = useState(premissasDefault);
  const [planilha, setPlanilha] = useState(null); // { nomeArquivo, anos, receitaPorAno, ebitdaPorAno }
  const [erroPlanilha, setErroPlanilha] = useState(null);
  const [carregandoPlanilha, setCarregandoPlanilha] = useState(false);
  const inputArquivoRef = useRef(null);
  // Premissas de antes da planilha sobrescrever os sliders — permite desfazer ao remover.
  const premissasAntesDoUploadRef = useRef(null);

  const anosAtuais = planilha ? planilha.anos : anosMock;

  // Recalcula toda vez que qualquer premissa (ou a planilha carregada) muda —
  // é aqui que entra a fórmula real do modelo financeiro no futuro, no lugar do mock.
  const resultado = useMemo(() => {
    if (planilha) {
      return calcularMetricas({
        anosProjecao: planilha.anos,
        receitaPorAno: planilha.receitaPorAno,
        ebitdaPorAno: planilha.ebitdaPorAno,
        premissas,
      });
    }
    return calcularProjecao(premissas);
  }, [premissas, planilha]);

  function atualizarPremissa(campo, valor) {
    setPremissas((prev) => ({ ...prev, [campo]: valor }));
  }

  function abrirSeletorDeArquivo() {
    inputArquivoRef.current?.click();
  }

  async function handleArquivoSelecionado(evento) {
    const arquivo = evento.target.files?.[0];
    evento.target.value = ''; // permite selecionar o mesmo arquivo de novo depois de um erro

    if (!arquivo) return;

    setErroPlanilha(null);
    setCarregandoPlanilha(true);

    try {
      const dados = await parsePlanilha(arquivo);
      setPlanilha({ ...dados, nomeArquivo: arquivo.name });
      if (dados.premissas) {
        // Só guarda o snapshot na primeira planilha da sessão de upload,
        // pra não perder o estado original se o usuário trocar de arquivo.
        if (!planilha) premissasAntesDoUploadRef.current = premissas;
        setPremissas((prev) => ({ ...prev, ...dados.premissas }));
      }
    } catch (erro) {
      setPlanilha(null);
      setErroPlanilha(
        erro instanceof PlanilhaError
          ? erro.message
          : 'Não foi possível ler essa planilha. Verifique o formato do arquivo.'
      );
    } finally {
      setCarregandoPlanilha(false);
    }
  }

  function removerPlanilha() {
    setPlanilha(null);
    setErroPlanilha(null);
    if (premissasAntesDoUploadRef.current) {
      setPremissas(premissasAntesDoUploadRef.current);
      premissasAntesDoUploadRef.current = null;
    }
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

      <div className="barra-planilha">
        <div className="barra-planilha-acoes">
          <button type="button" onClick={abrirSeletorDeArquivo} disabled={carregandoPlanilha}>
            {carregandoPlanilha ? 'Lendo planilha…' : 'Carregar planilha'}
          </button>
          <input
            ref={inputArquivoRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleArquivoSelecionado}
            hidden
          />

          {planilha ? (
            <>
              <span className="planilha-status planilha-status-ok">
                Usando dados de <strong>{planilha.nomeArquivo}</strong> ({planilha.anos.length} anos)
              </span>
              <button type="button" className="botao-secundario" onClick={removerPlanilha}>
                Usar dados de exemplo
              </button>
            </>
          ) : (
            <span className="planilha-status">
              Nenhuma planilha carregada — exibindo dados de exemplo fictícios.
            </span>
          )}
        </div>

        {erroPlanilha && <p className="planilha-erro">{erroPlanilha}</p>}

        <p className="planilha-dica">
          Formato esperado: colunas <strong>Ano</strong>, <strong>Receita</strong> e <strong>EBITDA</strong> na
          primeira aba. Opcionalmente, uma aba <strong>Premissas</strong> com WACC, Crescimento Receita,
          Perpetuidade (G) e Dívida Líquida.
        </p>
      </div>

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
        <GraficoReceita anos={anosAtuais} receitaPorAno={resultado.receitaPorAno} />
        <GraficoEbitda anos={anosAtuais} ebitdaPorAno={resultado.ebitdaPorAno} />
      </div>
    </div>
  );
}

export default Dashboard;
