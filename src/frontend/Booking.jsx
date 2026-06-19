import "./Booking.css";
import { useState } from "react";

function Booking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value.slice(0, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name,
      phone,
      checkIn,
      checkOut,
      guests
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

      if (res.ok) {
        alert("Booking Confirmed!");
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

        <h1 className="booking-title">Booking Form</h1>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <label>Guest Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* PHONE */}
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={phone}
            onChange={handlePhoneChange}
            maxLength="10"
            required
          />

          {/* DATE ROW */}
          <div className="date-row">

            <div className="date-box">
              <label>Check-In Date</label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setCheckOut("");
                }}
                required
              />
            </div>

            <div className="date-box">
              <label>Check-Out Date</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

          </div>

          {/* GUESTS */}
          <label>Number of Guests</label>
          <input
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          />

          {/* SLOT */}
          <label>Select Time Slot</label>
          <select required>
            <option>12 Hours (9 AM - 9 PM)</option>
            <option>12 Hours (9 PM - 9 AM)</option>
            <option>24 Hours Stay</option>
          </select>

          {/* BUTTON */}
          <button type="submit">
            Confirm Booking
          </button>

        </form>

      </div>
    </div>
  );
}

export default Booking;