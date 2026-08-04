import mongoose from "mongoose";

const agroOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    productId: { type: String, required: true },
    productName: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    quantityKg: { type: Number, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    remainingStockKg: { type: Number },
  },
  { timestamps: true }
);

const AgroOrder = mongoose.model("AgroOrder", agroOrderSchema);

export default AgroOrder;
