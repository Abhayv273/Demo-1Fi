export default function EmiPlanCard({ plan, selected, onSelect }) {
  return (
    <button
      className={`emi-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(plan)}
    >
      <div className="emi-radio">{selected ? "✓" : ""}</div>
      <div>
        <strong>{plan.months} months</strong>
        <span>₹{plan.monthlyAmount.toLocaleString("en-IN")} / month</span>
      </div>
      <small>0% interest</small>
    </button>
  );
}
