function SliderPremissa({ label, valor, min, max, step, onChange }) {
  return (
    <div className="slider-premissa">
      <div className="slider-premissa-topo">
        <span>{label}</span>
        <span className="slider-premissa-valor">{(valor * 100).toFixed(1)}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default SliderPremissa;
