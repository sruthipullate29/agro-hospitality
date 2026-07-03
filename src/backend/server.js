import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://agro-hospitality.vercel.app",
      "http://localhost:5173",],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Agro Hospitality Backend Running ✅");
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

let bookings = [];
let bookingCounter = 1;

let agroOrders = [];
let orderCounter = 1;

const productStock = {
  "basmati-rice": 1000,
  "organic-turmeric": 1000,
  "coffee-beans": 1000,
  "red-chilli": 1000,
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Agro Hospitality" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
    return true;

  } catch (error) {
    console.error("❌ Email Error:", error);
    return false;
  }
};


app.get("/agro-stock/:productId", (req, res) => {
  const stock = productStock[req.params.productId];

  if (stock === undefined) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    stockKg: stock,
  });
});

app.post("/agro-order", async (req, res) => {
  try {
    const {
      productId,
      productName,
      name,
      email,
      phone,
      quantityKg,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const qty = Number(quantityKg);
    const available = productStock[productId];

    if (available === undefined) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!qty || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid quantity",
      });
    }

    if (qty > available) {
      return res.status(400).json({
        success: false,
        message: `Only ${available} kg available`,
      });
    }

    const orderId = "ORD" + String(orderCounter).padStart(4, "0");
    orderCounter++;

    productStock[productId] = available - qty;

    const orderData = {
      orderId,
      productId,
      productName,
      name,
      email,
      phone,
      quantityKg: qty,
      address,
      city,
      state,
      pincode,
      remainingStockKg: productStock[productId],
    };

    agroOrders.push(orderData);

    if (process.env.OWNER_EMAIL) {
      await sendEmail(
        process.env.OWNER_EMAIL,
        `New Agro Order - ${orderId}`,
        `
        <h2>🌾 New Agro Order</h2>
        <p><b>Order ID:</b> ${orderId}</p>
        <p><b>Product:</b> ${productName}</p>
        <p><b>Quantity:</b> ${qty} kg</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        `
      );
    }

    res.json({
      success: true,
      order: orderData,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.post("/book", async (req, res) => {
  try {
    const booking = req.body;

    const existingBooking = bookings.find(
      (b) =>
        b.checkIn === booking.checkIn &&
        b.slot === booking.slot
    );

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Selected slot is already booked",
      });
    }

    const bookingId =
      "BK" + String(bookingCounter).padStart(4, "0");

    bookingCounter++;

    const bookingData = {
      bookingId,
      ...booking,
    };

    bookings.push(bookingData);

    if (process.env.OWNER_EMAIL) {
      await sendEmail(
        process.env.OWNER_EMAIL,
        `New Booking - ${bookingId}`,
        `
        <h2>New Booking Received</h2>
        <p><b>Booking ID:</b> ${bookingId}</p>
        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Email:</b> ${booking.email}</p>
        <p><b>Phone:</b> ${booking.phone}</p>
        <p><b>Check In:</b> ${booking.checkIn}</p>
        <p><b>Check Out:</b> ${booking.checkOut}</p>
        <p><b>Guests:</b> ${booking.guests}</p>
        <p><b>Slot:</b> ${booking.slot}</p>
        `
      );
    }

    if (booking.email) {
      await sendEmail(
        booking.email,
        `Booking Confirmation - ${bookingId}`,
        `
        <h2>Booking Confirmed</h2>
        <p>Hello ${booking.name},</p>
        <p>Your booking has been successfully confirmed.</p>

        <p><b>Booking ID:</b> ${bookingId}</p>
        <p><b>Check In:</b> ${booking.checkIn}</p>
        <p><b>Check Out:</b> ${booking.checkOut}</p>
        <p><b>Guests:</b> ${booking.guests}</p>
        <p><b>Slot:</b> ${booking.slot}</p>

        <p>Thank you for choosing Agro Hospitality.</p>
        `
      );
    }

    res.json({
      success: true,
      booking: bookingData,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});