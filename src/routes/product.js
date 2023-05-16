import express from "express";
import ProductController from "~/controllers/ProductController";
const router = express.Router();

const productController = new ProductController();

router.use("/vegetables", productController.vegetables);

router.use("/herbs-armatics", productController.herbs_armatics);

router.use("/frozen", productController.frozen);

router.use("/meat-seafood ", productController.meat_seafood);

router.use("/dairy-eggs", productController.dairy_eggs);

router.use("/", productController.index);

export default router;
