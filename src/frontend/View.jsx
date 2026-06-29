import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "./data/products";
import "./View.css";

function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const [stockKg, setStockKg] = useState(product?.stockKg ?? 0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantityKg: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!product) return;

    fetch(`http://localhost:5000/agro-stock/${product.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStockKg(data.stockKg);
        }
      })
      .catch(() => {});
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/agro-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          ...form,
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/order-placed", { state: data.order });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="view-page">
        <div className="view-card">
          <h1>Product not found</h1>
          <Link to="/agro" className="view-back">Back to Agro</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="view-page">
      <div className="view-card view-card-wide">
        <img src={product.image} alt={product.name} className="view-image" />
        <h1>{product.name}</h1>
        <p className="view-price">{product.price}</p>
        <p className="view-stock">Available: {stockKg} kg</p>
        <p className="view-desc">{product.description}</p>
        <div className="view-meta">
          <span>Origin: {product.origin}</span>
          <span>Status: {product.stock}</span>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <h2>Place Order</h2>
          <p className="order-form-note">Enter your details and delivery location</p>

          <div className="order-grid">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                maxLength="10"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Quantity (kg)</label>
              <input
                type="number"
                name="quantityKg"
                min="1"
                max={stockKg}
                value={form.quantityKg}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h3>Delivery Location</h3>
          <div className="order-grid">
            <div className="order-full">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street, building, area"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                maxLength="6"
                value={form.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="view-actions">
            <Link to="/agro" className="view-back">Back to Products</Link>
            <button type="submit" className="view-order-btn" disabled={loading || stockKg <= 0}>
              {loading ? "Placing Order..." : stockKg <= 0 ? "Out of Stock" : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default View;
