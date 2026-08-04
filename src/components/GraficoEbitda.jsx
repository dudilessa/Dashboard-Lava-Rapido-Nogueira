import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { anos } from '../data/mockData';

function GraficoEbitda({ ebitdaPorAno }) {
  const dados = anos.map((ano, i) => ({
    ano,
    ebitda: Math.round(ebitdaPorAno[i]),
  }));

  return (
    <div className="grafico-container">
      <p className="grafico-titulo">EBITDA</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={dados}>
          <defs>
            <linearGradient id="corEbitda" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dbbe0" />
              <stop offset="100%" stopColor="#2f6fd1" />
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
            formatter={(v) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, 'EBITDA']}
          />
          <Bar dataKey="ebitda" fill="url(#corEbitda)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoEbitda;
