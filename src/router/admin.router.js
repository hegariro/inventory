const { verifyToken, isAdmin } = require("../middlewares/auth-jwt.middleware");
const { listAllProducts, listProductByID, createProduct,
    updateProduct, deleteProduct } = require("../admin/products.controller");

const express = require("express");
const adminRouter = express.Router();

adminRouter.get("/products", [ verifyToken, isAdmin ], listAllProducts);
adminRouter.get("/products/:id", [ verifyToken, isAdmin ], listProductByID);
adminRouter.post("/products", [ verifyToken, isAdmin ], createProduct);
adminRouter.put("/products/:id", [ verifyToken, isAdmin ], updateProduct);
adminRouter.delete("/products/:id", [ verifyToken, isAdmin ], deleteProduct);

module.exports = adminRouter;