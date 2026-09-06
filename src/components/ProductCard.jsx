export default function ProductCard({ product, onOpen }) {
  const price = Math.min(...product.variants.map((v) => v.price));
  return (
    <article className="product">
      <button className="image-btn" onClick={() => onOpen(product)}>
        <img src={product.image} alt={product.name} />
      </button>
      <div className="pbody">
        <small>{product.brand}</small>
        <h3>{product.name}</h3>
        <div className="rating">
          ★ {product.rating} <span>({product.reviews})</span>
        </div>
        <strong>From ₹{price.toLocaleString("en-IN")}</strong>
        <p className="emi">✓ No-cost EMI available</p>
        <div className="pactions">
          <button className="secondary" onClick={() => onOpen(product)}>
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
