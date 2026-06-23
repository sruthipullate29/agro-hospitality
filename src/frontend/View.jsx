import { Link, useParams } from "react-router-dom";
import { getProductById } from "./data/products";
import "./View.css";

function View() {
  const { id } = useParams();
  const product = getProductById(id);

  // #region agent log
  fetch("http://127.0.0.1:7482/ingest/f7d09ab7-b4ee-4723-aaac-cc302df10b38", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "d35c8a" },
    body: JSON.stringify({
      sessionId: "d35c8a",
      runId: "pages-fix",
      hypothesisId: "VIEW",
      location: "src/frontend/View.jsx",
      message: "view page rendered",
      data: { id, found: Boolean(product) },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

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
      <div className="view-card">
        <img src={product.image} alt={product.name} className="view-image" />
        <h1>{product.name}</h1>
        <p className="view-price">{product.price}</p>
        <p className="view-desc">{product.description}</p>
        <div className="view-meta">
          <span>Origin: {product.origin}</span>
          <span>Status: {product.stock}</span>
        </div>
        <div className="view-actions">
          <Link to="/agro" className="view-back">Back to Products</Link>
          <Link to="/contact" className="view-contact">Contact to Order</Link>
        </div>
      </div>
    </div>
  );
}

export default View;
