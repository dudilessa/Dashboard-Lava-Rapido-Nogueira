import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function GraficoReceita({ anos, receitaPorAno }) {
  const dados = anos.map((ano, i) => ({
    ano,
    receita: Math.round(receitaPorAno[i]),
  }));

  return (
    <div className="grafico-container">
      <p className="grafico-titulo">Receita projetada</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={dados}>
          <defs>
            <linearGradient id="corReceita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7dbbe0" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#2f6fd1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2f4a" />
          <XAxis dataKey="ano" stroke="#5b6d8a" fontSize={12} />
          <YAxis
            stroke="#5b6d8a"
            fontSize={12}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{ background: '#0d1526', border: '1px solid #1f2f4a', borderRadius: 8 }}
            labelStyle={{ color: '#edf3fb' }}
            formatter={(v) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, 'Receita']}
          />
          <Area type="monotone" dataKey="receita" stroke="#7dbbe0" fill="url(#corReceita)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoReceita;
