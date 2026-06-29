import "./ConfirmBooking.css";
import { useLocation, Link } from "react-router-dom";

function ConfirmBooking() {
  const location = useLocation();
  const booking = location.state;

  if (!booking) {
    return (
      <div className="confirm-page">
        <div className="confirm-card">
          <h1 className="title">
            <span className="tick">✔</span>
            Booking Confirmed
          </h1>

          <div className="no-booking">
            <h2>No Booking Found</h2>
            <p>Please make a booking first.</p>

            <Link to="/" className="home-btn">
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-page">
      <div className="confirm-card">

        <h1 className="title">
          <span className="tick">✔</span>
          Booking Confirmed
        </h1>

        <p className="success-message">
          Thank you for choosing us. Your reservation has been confirmed successfully.
        </p>

        <div className="booking-id-box">
          Booking ID: {booking.bookingId}
        </div>

        <div className="details">
          <h3>Booking Details</h3>

          {booking.hotelName && (
            <p>
              <strong>Hotel:</strong> {booking.hotelName}
            </p>
          )}

          <p>
            <strong>Name:</strong> {booking.name}
          </p>

          <p>
            <strong>Email:</strong> {booking.email}
          </p>

          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>

          <p>
            <strong>Guests:</strong> {booking.guests}
          </p>

          <p>
            <strong>Check In:</strong> {booking.checkIn}
          </p>

          <p>
            <strong>Check Out:</strong> {booking.checkOut}
          </p>

          <p>
            <strong>Slot:</strong> {booking.slot}
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

      </div>
    </div>
  );
}

export default ConfirmBooking;