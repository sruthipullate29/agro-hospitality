import { useLocation, Link } from "react-router-dom";
import "./ConfirmBooking.css";

function ConfirmBooking() {
  const location = useLocation();
  const booking = location.state;

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <h1 className="title">
          <span className="tick">✔ </span>
          Booking Confirmed
        </h1>

        {!booking ? (
          <>
            <h2>No Booking Found</h2>

            <Link to="/" className="home-btn">
              Go Home
            </Link>
          </>
        ) : (
          <>
            <h2 className="booking-id-box">
              Booking ID: {booking.bookingId}
            </h2>

            <div className="details">
              <h3>Booking Details</h3>

              <p>
                <b>Name:</b> {booking.name}
              </p>

              <p>
                <b>Email:</b> {booking.email}
              </p>

              <p>
                <b>Phone:</b> {booking.phone}
              </p>

              <p>
                <b>Guests:</b> {booking.guests}
              </p>

              <p>
                <b>Check In:</b> {booking.checkIn}
              </p>

              <p>
                <b>Check Out:</b> {booking.checkOut}
              </p>

              <p>
                <b>Slot:</b> {booking.slot}
              </p>
            </div>

            <div className="btn-group">
              <button
                className="print-btn"
                onClick={() => window.print()}
              >
                Print Booking
              </button>

              <Link to="/" className="home-btn">
                Go To Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ConfirmBooking;
