import "./Booking.css";
import { useState } from "react";

function Booking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value.slice(0, 10));
  };

  return (
    <div className="booking-page">
      <div className="booking-card">

        <h1 className="booking-title">Booking Form</h1>

        <form>

          {/* NAME */}
          <label>Guest Name</label>
          <input
            type="text"
            placeholder="Enter your name"
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