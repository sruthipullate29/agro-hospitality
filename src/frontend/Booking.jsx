import "./Booking.css";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
 function Booking() { 
  const navigate = useNavigate(); 
  const today = new Date().toISOString().split("T")[0]; 
  const [form, setForm] = useState({ name: "", email: "", phone: "", guests: "", checkIn: "", checkOut: "", slot: "", });  


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      navigate("/booking-confirmed", { state: data.booking });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-card">

        <h1 className="booking-title">Hotel Reservation</h1>
        <p className="booking-subtitle">Complete your booking details</p>

        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input name="name" onChange={handleChange} required />

          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required />

          <label>Phone</label>
          <input name="phone" maxLength="10" onChange={handleChange} required />

          <label>Guests</label>
          <input name="guests" type="number" min="1" onChange={handleChange} required />

          <div className="row">
            <div>
              <label>Check In</label>
              <input name="checkIn" type="date" min={today} onChange={handleChange} required />
            </div>

            <div>
              <label>Check Out</label>
              <input name="checkOut" type="date" min={form.checkIn || today} onChange={handleChange} required />
            </div>
          </div>

          <label>Slot</label>
          <select name="slot" onChange={handleChange} required>
            <option value="">Select Slot</option>
            <option>12 Hours (9 AM - 9 PM)</option>
            <option>12 Hours (9 PM - 9 AM)</option>
            <option>24 Hours Stay</option>
          </select>

          <button type="submit">Confirm Booking</button>
          <Link to="/">ConfirmBooking</Link>

        </form>

      </div>
    </div>
  );
}

export default Booking;