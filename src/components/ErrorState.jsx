export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card error-state">
      <strong>Unable to load marketplace</strong>
      <span>{message}</span>
      <button className="primary small-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
