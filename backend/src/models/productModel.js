import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 1,
      max: 100,
      required: true,
      unique: true,
    },
    image: { type: String, 
      // required: true 
    },
    // category
    type: { type: String, required: true },
    price: {
      type: Number,
      min: [0, "Product price can not be negative"],
      required: true,
    },
    countInStock: { type: Number, default: 1, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
    discount: { type: Number },
    // sales
    selled: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
