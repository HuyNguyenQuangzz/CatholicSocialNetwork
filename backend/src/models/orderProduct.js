import mongoose from "mongoose";
// const mongoose = require("mongoose");

// Thông tin đơn hàng:
// Tên khách hàng: Tên đầy đủ của khách hàng.
// Địa chỉ giao hàng: Địa chỉ giao hàng của khách hàng.
// Số điện thoại: Số điện thoại liên hệ của khách hàng.
// Email: Địa chỉ email liên hệ của khách hàng.
// Phương thức thanh toán: Phương thức thanh toán của khách hàng (Thanh toán trực tuyến, thanh toán khi nhận hàng,...)
// Trạng thái đơn hàng: Trạng thái đơn hàng (Đang chờ xử lý, Đang giao hàng, Đã giao hàng thành công,...)
// Danh sách sản phẩm: Danh sách sản phẩm mà khách hàng đã đặt mua.
// Tổng giá trị đơn hàng: Tổng giá trị của đơn hàng.

const orderSchema = new mongoose.Schema(
  {
    // customerName: { type: String },
    // address: { type: String },
    // phoneNumber: { type: String },
    // email: { type: String },
    // mothodPayment: { type: String },
    // status: { type: String, default: "active" },
    // productList: { type: String },
    // totalPrice: { type: Number },
    orderItems: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      // city: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
