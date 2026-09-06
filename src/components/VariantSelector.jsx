export default function VariantSelector({ variants, selected, onChange }) {
  const colors = [...new Set(variants.map((v) => v.color))];
  return (
    <div className="variant-section">
      <h3>Choose variant</h3>
      <div className="variant-group">
        <span>Color</span>
        <div className="option-row">
          {colors.map((c) => {
            const v = variants.find((x) => x.color === c);
            return (
              <button
                key={c}
                className={`option-btn ${selected?.color === c ? "selected" : ""}`}
                onClick={() => onChange(v)}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
      <div className="variant-group">
        <span>Variant / Storage</span>
        <div className="option-row">
          {variants.map((v) => (
            <button
              key={v.id}
              className={`option-btn ${selected?.id === v.id ? "selected" : ""}`}
              onClick={() => onChange(v)}
            >
              {v.variant}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
