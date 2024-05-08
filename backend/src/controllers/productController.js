import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      discount,
    } = req.body;
    // let { image } = req.body;

    // Implement error handling for missing input
    const requiredFields = [
      "name",
      "image",
      "type",
      "countInStock",
      "price",
      "rating",
      "description",
      "discount",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          status: "ERR",
          message: `The ${field} field is required`,
        });
      }
    }
    // Handle creating a new product with an image saved in Cloudinary
    // Code implementation for saving image in Cloudinary goes here
    // Upload image to Cloudinary

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "product_images", // Specify folder in Cloudinary to store images
    });

    // Save image URL to product data
    // Convert countInStock and discount to numbers
    const data = {
      name,
      image: uploadedImage.secure_url, // Use secure URL provided by Cloudinary
      type,
      countInStock: Number(countInStock),
      price: Number(price),
      rating: Number(rating),
      description,
      discount: Number(discount),
    };

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({
        status: "ERR",
        message: "A product with the same name already exists",
      });
    }

    // Create a new product
    const newProduct = await Product.create(data);

    return res.status(201).json({
      status: "OK",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// handle update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({
        status: "ERR",
        message: "The product was not found",
      });
    }
    return res.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// handle get product detail
const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "ERR",
        message: "The product was not found",
      });
    }
    return res.status(200).json({
      status: "OK",
      message: "SUCCESS",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    // handle not found
    if (!product) {
      return res.status(404).json({
        status: "ERR",
        message: "The product with the provided ID was not found",
      });
    }
    res.status(200).json("Delete product successfully");
  } catch (err) {
    // res.status(500).json({ error: err.message });
    res.status(400).json("Product not found");
  }
};

// handle delete many product
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await Product.deleteMany({ _id: { $in: ids } });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};
// handle get all product
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// handle get all type of product
const getAllType = async (req, res) => {
  try {
    const types = await Product.find().distinct("type");
    return res.status(200).json(types);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteMany,
  getAllType,
};
