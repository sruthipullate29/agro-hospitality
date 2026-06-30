import "./Booking.css";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const hotel = location.state?.hotel;

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    checkIn: "",
    checkOut: "",
    slot: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotel) {
      alert("Please select a hotel from the Hospitality page first.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          hotelName: hotel.name,
          hotelPrice: hotel.price,
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/confirmbooking", {
          state: data.booking,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) {
    return (
      <div className="booking-page">
        <div className="booking-card">
          <h1 className="booking-title">Hotel Reservation</h1>
          <p className="booking-subtitle">
            Please choose a hotel before booking.
          </p>
          <Link to="/hospitality" className="select-hotel-link">
            Browse Hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1 className="booking-title">Hotel Reservation</h1>

        <p className="booking-subtitle">
          Complete your booking details
        </p>

        <div className="hotel-summary">
          <h3>{hotel.name}</h3>
          <p>📍 {hotel.location}</p>
          <p>
            <b>Rate:</b> {hotel.price}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            maxLength="10"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label>Guests</label>
          <input
            type="number"
            name="guests"
            min="1"
            value={form.guests}
            onChange={handleChange}
            required
          />

          <div className="row">
            <div>
              <label>Check In</label>
              <input
                type="date"
                name="checkIn"
                min={today}
                value={form.checkIn}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Check Out</label>
              <input
                type="date"
                name="checkOut"
                min={form.checkIn || today}
                value={form.checkOut}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Slot</label>
<select
  name="slot"
  value={form.slot}
  onChange={handleChange}
  required
>
  <option value="">Select Slot</option>

  {form.checkIn &&
  form.checkOut &&
  form.checkIn === form.checkOut ? (
    <>
      <option value="12 Hours (9 AM - 9 PM)">
        12 Hours (9 AM - 9 PM)
      </option>

      <option value="24 Hours Stay">
        24 Hours Stay
      </option>
    </>
  ) : (
    <>
      <option value="12 Hours (9 AM - 9 PM)">
        12 Hours (9 AM - 9 PM)
      </option>

      <option value="12 Hours (9 PM - 9 AM)">
        12 Hours (9 PM - 9 AM)
      </option>

      <option value="24 Hours Stay">
        24 Hours Stay
      </option>
       </>
        )}
        </select>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
