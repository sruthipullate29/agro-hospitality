import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// TEMP DATABASE (replace with MongoDB later)
let bookings = [];

app.post("/book", async (req, res) => {
  const booking = req.body;

  // 1. check if slot already booked
  const conflict = bookings.find(
    b => b.checkIn === booking.checkIn
  );

  if (conflict) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  // 2. save booking
  bookings.push(booking);

  // 3. send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",
      pass: "your_app_password"
    }
  });

  await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: "sruthipullate@gmail.com",
    subject: "New Booking Received",
    text: `
New Booking Details:

Name: ${booking.name}
Phone: ${booking.phone}
Check-In: ${booking.checkIn}
Check-Out: ${booking.checkOut}
Guests: ${booking.guests}
    `
  });

  res.json({ message: "Booking confirmed" });
});

app.listen(5000, () => console.log("Server running on 5000"));