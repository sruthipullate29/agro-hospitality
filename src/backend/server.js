import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let bookings = [];
let bookingCounter = 1;

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// SEND EMAIL FUNCTION
const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

app.post("/book", async (req, res) => {
  try {
    const booking = req.body;

    // SLOT CHECK
    const existingBooking = bookings.find(
      (b) =>
        b.checkIn === booking.checkIn &&
        b.slot === booking.slot
    );

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Selected slot is already booked for this date.",
      });
    }

    const bookingId = "BK" + String(bookingCounter).padStart(4, "0");
    bookingCounter++;

    const bookingData = { bookingId, ...booking };
    bookings.push(bookingData);

    // OWNER EMAIL (CLEAN UI)
    await sendEmail(
      process.env.OWNER_EMAIL,
      `New Booking Received - ${bookingId}`,
      `
      <div style="font-family:Arial;padding:20px">
        <h2>🆕 New Booking</h2>
        <p><b>Booking ID:</b> ${bookingId}</p>
        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Email:</b> ${booking.email}</p>
        <p><b>Phone:</b> ${booking.phone}</p>
        <p><b>Guests:</b> ${booking.guests}</p>
        <p><b>Check In:</b> ${booking.checkIn}</p>
        <p><b>Check Out:</b> ${booking.checkOut}</p>
        <p><b>Slot:</b> ${booking.slot}</p>
      </div>
      `
    );

    // USER EMAIL (CONFIRMATION)
    await sendEmail(
      booking.email,
      `Booking Confirmed - ${bookingId}`,
      `
      <div style="font-family:Arial;padding:20px">
        <h2 style="color:green">✅ Booking Confirmed</h2>
        <p>Hi <b>${booking.name}</b>,</p>
        <p>Your booking is confirmed successfully.</p>

        <h3>Booking ID: ${bookingId}</h3>

        <p><b>Check In:</b> ${booking.checkIn}</p>
        <p><b>Check Out:</b> ${booking.checkOut}</p>
        <p><b>Guests:</b> ${booking.guests}</p>
        <p><b>Slot:</b> ${booking.slot}</p>

        <br/>
        <p>Thank you for choosing us ❤️</p>
      </div>
      `
    );

    res.json({
      success: true,
      booking: bookingData,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));