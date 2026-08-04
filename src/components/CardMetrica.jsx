function formatarMoeda(valor) {
  if (Math.abs(valor) >= 1_000_000) return `R$ ${(valor / 1_000_000).toFixed(2)} mi`;
  if (Math.abs(valor) >= 1_000) return `R$ ${(valor / 1_000).toFixed(0)} mil`;
  return `R$ ${valor.toFixed(0)}`;
}

function CardMetrica({ titulo, valor, formato = 'moeda', legenda }) {
  const valorFormatado = formato === 'percentual'
    ? `${(valor * 100).toFixed(1)}%`
    : formatarMoeda(valor);

  return (
    <div className="card-metrica">
      <p className="card-metrica-titulo">{titulo}</p>
      <p className="card-metrica-valor">{valorFormatado}</p>
      {legenda && <p className="card-metrica-legenda">{legenda}</p>}
    </div>
  );
}

export default CardMetrica;
