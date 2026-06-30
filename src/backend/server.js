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
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("Mail Error:", error.message);
  } else {
    console.log("Mail Server Ready ✅");
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("Email credentials missing");
      return;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.log("Email Send Error:", error.message);
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

    res.json({
      success: true,
      booking: bookingData,
    });
    
    if (process.env.OWNER_EMAIL) {
      sendEmail(
        process.env.OWNER_EMAIL,
        `New Booking - ${bookingId}`,
        `
        <h2>🆕 New Booking</h2>
        <p><b>Booking ID:</b> ${bookingId}</p>
        <p><b>Name:</b> ${booking.name}</p>
        <p><b>Email:</b> ${booking.email}</p>
        <p><b>Phone:</b> ${booking.phone}</p>
        `
      );
    }
    
    if (booking.email) {
      sendEmail(
        booking.email,
        `Booking Confirmed - ${bookingId}`,
        `
        <h2>✅ Booking Confirmed</h2>
        <p>Hello ${booking.name}</p>
        <p>Your booking has been confirmed.</p>
        <p><b>Booking ID:</b> ${bookingId}</p>
        `
      );
    }

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