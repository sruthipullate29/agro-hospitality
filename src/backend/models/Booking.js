import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    checkIn: { type: String, required: true },
    checkOut: { type: String },
    slot: { type: String, required: true },
    guests: { type: Number },
    roomType: { type: String },
    // Keep any additional fields from the request body flexible
    extra: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
