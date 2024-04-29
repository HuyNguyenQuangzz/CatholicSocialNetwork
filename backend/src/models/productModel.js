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
    image: { type: String, required: true },
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

    // image: String,
    // category: {
    //"category"    : name of reference field
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "categories", //"categories"  : name of reference collection
    // },
    // size: String,
    // color: String,
    // number: {
    //   type: Number,
    //   min: [1, "Inventory number can not at less 1"],
    //   default: 1,
    //   max: [999, "Can't be greater than 999 product"],
    //   required: true,
    // },
    // brand: String,
    // material: String,
    // description: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
