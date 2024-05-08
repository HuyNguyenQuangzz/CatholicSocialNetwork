import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteMany,
  getAllType,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/create", createProduct);
router.put("/update/:id", protectRoute, updateProduct);
router.get("/productDetail/:id", getDetailsProduct);
router.delete("/delete/:id", protectRoute, deleteProduct);
router.get("/list", getAllProduct);

router.post("/deleteMany", protectRoute, deleteMany);

router.get("/listType", getAllType);

export default router;
