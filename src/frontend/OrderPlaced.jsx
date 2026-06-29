import { useLocation, Link } from "react-router-dom";
import "./OrderPlaced.css";

function OrderPlaced() {
  const location = useLocation();
  const order = location.state;

  return (
    <div className="order-placed-page">
      <div className="order-placed-card">
        <h1 className="order-placed-title">
          <span className="tick">✔ </span>
          Order Placed
        </h1>

        {!order ? (
          <>
            <h2>No order found</h2>
            <Link to="/agro" className="order-placed-btn">
              Browse Products
            </Link>
          </>
        ) : (
          <>
            <h2 className="order-id-box">Order ID: {order.orderId}</h2>

            <div className="order-details">
              <h3>Order Summary</h3>
              <p><b>Product:</b> {order.productName}</p>
              <p><b>Quantity:</b> {order.quantityKg} kg</p>
              <p><b>Name:</b> {order.name}</p>
              <p><b>Email:</b> {order.email}</p>
              <p><b>Phone:</b> {order.phone}</p>

              <h3>Delivery Location</h3>
              <p><b>Address:</b> {order.address}</p>
              <p><b>City:</b> {order.city}</p>
              <p><b>State:</b> {order.state}</p>
              <p><b>Pincode:</b> {order.pincode}</p>
            </div>

            <div className="order-placed-actions">
              <Link to="/agro" className="order-placed-btn">
                Continue Shopping
              </Link>
              <Link to="/" className="order-placed-btn secondary">
                Go Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderPlaced;
