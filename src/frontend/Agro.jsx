import { Link } from "react-router-dom";
import { products } from "./data/products";
import "./Agro.css";

function Agro() {
  return (
    <div className="agro-page">
      <h1>🌾 Varun Agro Exports</h1>

      <input
        type="text"
        placeholder="Search Products..."
        className="search"
      />

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <Link to={`/view/${product.id}`}>
              <button type="button">View Details</button>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/" className="agro-back">← Back to Home</Link>
    </div>
  );
}

export default Agro;
