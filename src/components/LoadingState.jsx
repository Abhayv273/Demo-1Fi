export default function LoadingState({ text = "Loading..." }) {
  return (
    <div className="state-card">
      <div className="spinner" />
      <strong>{text}</strong>
      <span>Please wait a moment.</span>
    </div>
  );
}
