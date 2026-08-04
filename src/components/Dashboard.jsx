// Placeholder — vira o dashboard de verdade quando o modelo
// financeiro estiver pronto (cards de métrica, sliders, gráficos).
function Dashboard({ onSair }) {
  return (
    <div className="tela-dashboard">
      <header>
        <h1>Lava-Rápido Nogueira</h1>
        <button onClick={onSair}>Sair</button>
      </header>

      <p>Teste de deploy automático funcionando!</p>
    </div>
  );
}

export default Dashboard;
