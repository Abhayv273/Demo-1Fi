export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-copy">
        <small>{item.brand}</small>
        <h3>{item.name}</h3>
        <p>
          {item.variant.color} · {item.variant.variant}
        </p>
        <b>₹{item.variant.price.toLocaleString("en-IN")}</b>
        <p>
          EMI: {item.emi.months} months · ₹
          {item.emi.monthlyAmount.toLocaleString("en-IN")}/month
        </p>
      </div>
      <div className="cart-actions">
        <div className="quantity">
          <button onClick={onDecrease}>−</button>
          <span>{item.quantity}</span>
          <button onClick={onIncrease}>+</button>
        </div>
        <button className="remove" onClick={onRemove}>
          Remove
        </button>
      </div>
    </article>
  );
}
