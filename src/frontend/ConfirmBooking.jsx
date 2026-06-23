import { useLocation, Link } from "react-router-dom";
import "./ConfirmBooking.css";

function ConfirmBooking() {
  const { state } = useLocation();

  if (!state) {
    return <h2 style={{ textAlign: "center" }}>No Booking Found</h2>;
  }

  return (
    <div className="confirm-page">
      <div className="confirm-card">

        {/* TITLE */}
        <h1 className="title">
          <span className="tick">✔</span>
          Booking Confirmed
        </h1>

        {/* BOOKING ID */}
        <h2 className="booking-id-box">{state.bookingId}</h2>

        {/* DETAILS */}
        <div className="details">
          <h3>Booking Details</h3>
          <p><b>Name:</b> {state.name}</p>
          <p><b>Email:</b> {state.email}</p>
          <p><b>Phone:</b> {state.phone}</p>
          <p><b>Guests:</b> {state.guests}</p>
          <p><b>Check In:</b> {state.checkIn}</p>
          <p><b>Check Out:</b> {state.checkOut}</p>
          <p><b>Slot:</b> {state.slot}</p>
        </div>

        {/* BUTTONS */}
        <div className="btn-group">
          <button className="print-btn" onClick={() => window.print()}>
            Print Booking
          </button>

          <Link to="/" className="home-btn">
            Go to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ConfirmBooking;