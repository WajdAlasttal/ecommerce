import mongoose, { Schema, model, Types } from "mongoose";
const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: [
      {
        type: String,
        required: true,
      },
    ],
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          default: 1,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        finalPrice: {
          type: Number,
          required: true,
        },
        subTotal: {
          type: Number,
        },
      },
    ],
    couponId: {
      type: Types.ObjectId,
      ref: "Coupon",
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    paymentTypes: {
      type: [String],
      default: "cash",
      enum: ["cash", "card"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "canceled", "approved", "onWay", "delivered"],
    },
    reasonReject: String,
    note: String,
    updatedBy:{
        type:Types.ObjectId,
        ref : 'User',
    },
  },
  {
    timestamps: true,
  }
);
const orderModel = mongoose.models.Order || model("Order", orderSchema);
export default orderModel;
