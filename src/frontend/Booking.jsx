import "./Booking.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [slot, setSlot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name,
      email,
      phone,
      guests,
      checkIn,
      checkOut,
      slot
    };

    try {
      const res = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();

      if (data.success) {
        navigate("/booking-confirmed", {
          state: data.booking
        });
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("Server not running");
    }
  };

  return (
    <div className="booking-page">

      <div className="booking-card">

        <h1 className="booking-title">
          Hotel Reservation
        </h1>

        <p className="booking-subtitle">
          Complete your booking details
        </p>

        <form onSubmit={handleSubmit}>

          <label>Guest Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="10 digit mobile number"
            maxLength="10"
            required
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
          />

          <label>Guests</label>
          <input
            type="number"
            min="1"
            max="20"
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />

          <div className="date-row">

            <div className="date-box">
              <label>Check In</label>
              <input
                type="date"
                min={today}
                required
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setCheckOut("");
                }}
              />
            </div>

            <div className="date-box">
              <label>Check Out</label>
              <input
                type="date"
                min={checkIn || today}
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

          </div>

          <label>Select Slot</label>

          <select
            required
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          >
            <option value="">Choose Slot</option>

            <option value="12 Hours (9 AM - 9 PM)">
              12 Hours (9 AM - 9 PM)
            </option>

            <option value="12 Hours (9 PM - 9 AM)">
              12 Hours (9 PM - 9 AM)
            </option>

            <option value="24 Hours Stay">
              24 Hours Stay
            </option>

          </select>

          <button type="submit">
            Confirm Booking
          </button>

        </form>

      </div>

    </div>
  );
}

export default Booking;