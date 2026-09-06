import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { getEmiPlans, getProducts } from "./services/marketplaceApi";
import ProductCard from "./components/ProductCard";
import VariantSelector from "./components/VariantSelector";
import EmiPlanCard from "./components/EmiPlanCard";
import CartItem from "./components/CartItem";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

const categories = [
  "All",
  "Mobiles",
  "Laptops",
  "Audio",
  "Wearables",
  "Gaming",
];
const money = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

export default function App() {
  const [page, setPage] = useState("login"),
    [user, setUser] = useState(""),
    [mobile, setMobile] = useState("");
  const [products, setProducts] = useState([]),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const [category, setCategory] = useState("All"),
    [search, setSearch] = useState("");
  const [product, setProduct] = useState(null),
    [variant, setVariant] = useState(null),
    [plans, setPlans] = useState([]),
    [emiLoading, setEmiLoading] = useState(false),
    [selectedEmi, setSelectedEmi] = useState(null);
  const [cart, setCart] = useState([]),
    [toast, setToast] = useState(""),
    [order, setOrder] = useState(null);

  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setProducts(await getProducts());
    } catch {
      setError("The mock marketplace service could not be reached.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === "marketplace" && !products.length) load();
  }, [page]);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (!search.trim() ||
            `${p.name} ${p.brand} ${p.category}`
              .toLowerCase()
              .includes(search.toLowerCase())),
      ),
    [products, category, search],
  );
  const count = cart.reduce((s, i) => s + i.quantity, 0),
    total = cart.reduce((s, i) => s + i.variant.price * i.quantity, 0);

  const open = async (p) => {
    setProduct(p);
    const v = p.variants[0];
    setVariant(v);
    setSelectedEmi(null);
    setPlans([]);
    setPage("product");
    setEmiLoading(true);
    try {
      setPlans(await getEmiPlans(p.id, v.id));
    } finally {
      setEmiLoading(false);
    }
  };
  const changeVariant = async (v) => {
    setVariant(v);
    setSelectedEmi(null);
    setEmiLoading(true);
    try {
      setPlans(await getEmiPlans(product.id, v.id));
    } finally {
      setEmiLoading(false);
    }
  };
  const add = () => {
    if (!product || !variant || !selectedEmi) return;
    setCart((c) => {
      const old = c.find(
        (i) => i.productId === product.id && i.variant.id === variant.id,
      );
      return old
        ? c.map((i) =>
            i === old
              ? { ...i, quantity: i.quantity + 1, emi: selectedEmi }
              : i,
          )
        : [
            ...c,
            {
              productId: product.id,
              name: product.name,
              brand: product.brand,
              image: product.image,
              variant,
              emi: selectedEmi,
              quantity: 1,
            },
          ];
    });
    notify("Added with selected EMI plan");
    setPage("cart");
  };
  const logout = () => {
    setUser("");
    setCart([]);
    setPage("login");
  };

  if (page === "login")
    return (
      <main className="login">
        <section className="login-card">
          <div className="logo">1Fi</div>
          <span className="eyebrow">WELCOME TO 1FI</span>
          <h1>
            Shop today.
            <br />
            <em>Pay later.</em>
          </h1>
          <p className="muted">Experience the 1Fi Marketplace demo.</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const m = String(f.get("mobile"));
              if (!/^\d{10}$/.test(m)) {
                notify("Enter a valid 10-digit mobile number.");
                return;
              }
              setMobile(m);
              setUser(String(f.get("name")).trim() || "User");
              setPage("shop");
            }}
          >
            <label>Name</label>
            <input name="name" placeholder="Enter your name" required />
            <label>Mobile Number</label>
            <input
              name="mobile"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="10-digit mobile number"
              inputMode="numeric"
              required
            />
            <button className="primary full">Login</button>
          </form>
          <small className="note">
            Demo authentication. No real account is created.
          </small>
        </section>
      </main>
    );

  return (
    <div className="app">
      <header className="nav">
        <button className="logo-btn" onClick={() => setPage("shop")}>
          <span className="logo mini">1Fi</span>
        </button>
        <nav>
          <button onClick={() => setPage("shop")}>Home</button>
          <button onClick={() => setPage("shop")}>Shop</button>
          <button onClick={() => setPage("marketplace")}>Marketplace</button>
          <button
            onClick={() =>
              notify("How it Works is informational in this demo.")
            }
          >
            How it Works
          </button>
          <button onClick={() => notify("See README for demo FAQs.")}>
            FAQs
          </button>
        </nav>
        <div className="nav-right">
          <span className="hello">Hi, {user}</span>
          <button className="cart-nav" onClick={() => setPage("cart")}>
            🛒 Cart {count > 0 && <b>{count}</b>}
          </button>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      {page === "shop" && <Shop go={setPage} />}
      {page === "marketplace" && (
        <main className="content">
          <button className="back" onClick={() => setPage("shop")}>
            ← Back to Shop
          </button>
          <div className="market-head">
            <div>
              <span className="eyebrow purple">1FI MARKETPLACE</span>
              <h1>Shop what you love.</h1>
              <p className="muted">
                Discover products, variants and transparent EMI plans.
              </p>
            </div>
            <button className="primary" onClick={() => setPage("cart")}>
              🛒 Cart ({count})
            </button>
          </div>
          <div className="search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands or categories..."
            />
          </div>
          <div className="chips">
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? "chip active" : "chip"}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="result">
            <span>{filtered.length} products</span>
            <span>✓ Mock API data</span>
          </div>
          {loading ? (
            <LoadingState text="Loading marketplace products..." />
          ) : error ? (
            <ErrorState message={error} onRetry={load} />
          ) : (
            <div className="products">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={open} />
              ))}
            </div>
          )}
        </main>
      )}
      {page === "product" && product && (
        <main className="content">
          <button className="back" onClick={() => setPage("marketplace")}>
            ← Back to Marketplace
          </button>
          <section className="details">
            <div className="detail-img">
              <img src={product.image} alt={product.name} />
            </div>
            <div>
              <small className="purple">{product.brand}</small>
              <h1>{product.name}</h1>
              <div className="detail-rating">
                ★ {product.rating} <span>({product.reviews} reviews)</span>
              </div>
              <div className="detail-price">{money(variant?.price)}</div>
              <p className="desc">{product.description}</p>
              <VariantSelector
                variants={product.variants}
                selected={variant}
                onChange={changeVariant}
              />
              <div className="emi-section">
                <h2>Choose your EMI plan</h2>
                <p className="muted">Select one plan before proceeding.</p>
                {emiLoading ? (
                  <LoadingState text="Loading EMI plans..." />
                ) : (
                  <div className="emi-grid">
                    {plans.map((p) => (
                      <EmiPlanCard
                        key={p.id}
                        plan={p}
                        selected={selectedEmi?.id === p.id}
                        onSelect={setSelectedEmi}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="selection-box">
                <div>
                  <span>Selected variant</span>
                  <b>
                    {variant?.color} · {variant?.variant}
                  </b>
                </div>
                <div>
                  <span>Selected EMI</span>
                  <b>
                    {selectedEmi
                      ? `${selectedEmi.months} months · ${money(selectedEmi.monthlyAmount)}/month`
                      : "Select a plan"}
                  </b>
                </div>
              </div>
              <button
                className="primary large full"
                disabled={!selectedEmi}
                onClick={add}
              >
                {selectedEmi
                  ? "Proceed with Selected Plan"
                  : "Select an EMI Plan to Continue"}
              </button>
            </div>
          </section>
        </main>
      )}
      {page === "cart" && (
        <main className="content">
          <button className="back" onClick={() => setPage("marketplace")}>
            ← Continue Shopping
          </button>
          <h1 className="title">Your Cart</h1>
          {!cart.length ? (
            <div className="empty">
              <h2>Your cart is empty</h2>
              <button
                className="primary"
                onClick={() => setPage("marketplace")}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <section className="cart-layout">
              <div>
                {cart.map((i, index) => (
                  <CartItem
                    key={`${i.productId}-${i.variant.id}`}
                    item={i}
                    onIncrease={() =>
                      setCart((c) =>
                        c.map((x, n) =>
                          n === index ? { ...x, quantity: x.quantity + 1 } : x,
                        ),
                      )
                    }
                    onDecrease={() =>
                      setCart((c) =>
                        c.map((x, n) =>
                          n === index
                            ? { ...x, quantity: Math.max(1, x.quantity - 1) }
                            : x,
                        ),
                      )
                    }
                    onRemove={() =>
                      setCart((c) => c.filter((_, n) => n !== index))
                    }
                  />
                ))}
              </div>
              <aside className="summary">
                <span className="eyebrow">ORDER SUMMARY</span>
                <h2>Summary</h2>
                <Row a="Subtotal" b={money(total)} />
                <Row a="Delivery" b="FREE" />
                <hr />
                <Row a="Total" b={money(total)} total />
                <div className="pay-plan">
                  <strong>1Fi Pay Later</strong>
                  {cart[0] && (
                    <span>
                      {cart[0].emi.months} months ·{" "}
                      {money(cart[0].emi.monthlyAmount)}/month · 0% interest
                    </span>
                  )}
                </div>
                <button
                  className="primary full"
                  onClick={() => setPage("checkout")}
                >
                  Proceed to Checkout
                </button>
              </aside>
            </section>
          )}
        </main>
      )}
      {page === "checkout" && (
        <Checkout
          total={total}
          cart={cart}
          place={() => {
            setOrder({ id: `1FI-${Date.now().toString().slice(-7)}`, total });
            setCart([]);
            setPage("success");
          }}
          back={() => setPage("cart")}
        />
      )}
      {page === "success" && (
        <main className="success">
          <section>
            <div className="success-icon">✓</div>
            <span className="eyebrow purple">ORDER CONFIRMED</span>
            <h1>Order placed!</h1>
            <p className="muted">
              Your frontend demo order has been successfully placed.
            </p>
            <div className="order-id">
              Order ID <b>{order?.id}</b>
              <br />
              <small>{new Date().toLocaleString()}</small>
            </div>
            <button className="primary" onClick={() => setPage("marketplace")}>
              Continue Shopping
            </button>
          </section>
        </main>
      )}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

function Shop({ go }) {
  return (
    <>
      <section className="hero">
        <span className="pill">
          ✦ New &nbsp; No-cost EMIs backed by mutual funds
        </span>
        <h1>
          Shop today.
          <br />
          <em>Pay later</em> using
          <br />
          <strong>mutual funds.</strong>
        </h1>
        <div className="hero-actions">
          <button
            className="outline"
            onClick={() => alert("Eligibility check is a demo placeholder.")}
          >
            Check Eligibility ↗
          </button>
          <button className="primary" onClick={() => go("marketplace")}>
            Start Shopping →
          </button>
        </div>
        <p>
          No credit score required. No interest.
          <br />
          Fully backed by your <b>investments.</b>
        </p>
      </section>
      <section className="shop">
        <span className="eyebrow">SHOP</span>
        <h2>Choose how you want to shop.</h2>
        <div className="shop-grid">
          <Card
            icon="🏷️"
            title="Top Brands"
            text="Explore products from popular brands."
          />
          <Card
            icon="📍"
            title="Nearby Stores"
            text="Discover stores near your location."
          />
          <button
            className="shop-card featured"
            onClick={() => go("marketplace")}
          >
            <span className="icon">🛍️</span>
            <h3>1Fi Marketplace</h3>
            <p>Explore products with variants and EMI plans.</p>
            <strong>Explore Marketplace →</strong>
          </button>
        </div>
      </section>
    </>
  );
}
function Card({ icon, title, text }) {
  return (
    <div className="shop-card">
      <span className="icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <small>Coming soon</small>
    </div>
  );
}
function Row({ a, b, total }) {
  return (
    <div className={total ? "row total-row" : "row"}>
      <span>{a}</span>
      <b>{b}</b>
    </div>
  );
}
function Checkout({ total, cart, place, back }) {
  return (
    <main className="content narrow">
      <button className="back" onClick={back}>
        ← Back to Cart
      </button>
      <section className="checkout">
        <span className="eyebrow purple">CHECKOUT</span>
        <h1>Complete your order.</h1>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            place();
          }}
        >
          <label>Full Name</label>
          <input required placeholder="Enter full name" />
          <label>Mobile Number</label>
          <input
            required
            pattern="[0-9]{10}"
            maxLength="10"
            inputMode="numeric"
            placeholder="10-digit mobile number"
          />
          <label>Delivery Address</label>
          <textarea required placeholder="Enter delivery address" />
          <div className="payment">
            <input type="radio" checked readOnly />
            <span>
              <b>1Fi Pay Later</b>
              <small>
                {cart[0]?.emi?.months} months ·{" "}
                {money(cart[0]?.emi?.monthlyAmount || 0)}/month · 0% interest
                demo
              </small>
            </span>
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <b>{money(total)}</b>
          </div>
          <button className="primary full">Place Demo Order</button>
        </form>
      </section>
    </main>
  );
}
