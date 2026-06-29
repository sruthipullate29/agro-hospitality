import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

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

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

app.get("/agro-stock/:productId", (req, res) => {
  const stock = productStock[req.params.productId];
  if (stock === undefined) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  res.json({ success: true, stockKg: stock });
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
        message: "Product not found.",
      });
    }

    if (!qty || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid quantity in kg.",
      });
    }

    if (qty > available) {
      return res.status(400).json({
        success: false,
        message: `Only ${available} kg available for this product.`,
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

    await sendEmail(
      process.env.OWNER_EMAIL,
      `New Agro Order - ${orderId}`,
      `
      <div style="font-family:Arial;padding:20px">
        <h2>🌾 New Agro Order</h2>
        <p><b>Order ID:</b> ${orderId}</p>
        <p><b>Product:</b> ${productName}</p>
        <p><b>Quantity:</b> ${qty} kg</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>State:</b> ${state}</p>
        <p><b>Pincode:</b> ${pincode}</p>
      </div>
      `
    );

    await sendEmail(
      email,
      `Order Placed - ${orderId}`,
      `
      <div style="font-family:Arial;padding:20px">
        <h2 style="color:green">✅ Order Placed</h2>
        <p>Hi <b>${name}</b>,</p>
        <p>Your order for <b>${productName}</b> (${qty} kg) has been placed.</p>
        <p><b>Order ID:</b> ${orderId}</p>
        <p><b>Delivery address:</b> ${address}, ${city}, ${state} - ${pincode}</p>
        <br/>
        <p>Thank you for choosing Varun Agro Exports ❤️</p>
      </div>
      `
    );

    res.json({ success: true, order: orderData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
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
        message: "Selected slot is already booked for this date.",
      });
    }

    const bookingId = "BK" + String(bookingCounter).padStart(4, "0");
    bookingCounter++;

    const bookingData = { bookingId, ...booking };
    bookings.push(bookingData);

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
        <p><b>Hotel:</b> ${booking.hotelName || "N/A"}</p>
      </div>
      `
    );

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
        <p><b>Hotel:</b> ${booking.hotelName || "N/A"}</p>
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
