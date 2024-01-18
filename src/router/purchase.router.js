const { verifyToken, isAdmin, isCustomer } = require("../middlewares/auth-jwt.middleware");
const { listAllPurchases } = require("../admin/purchase.controller");
const { listPurchaseById, productsPurchased, createPurchase } = require("../customer/purchase.controller");

const express = require("express");
const purchaseRouter = express.Router();

purchaseRouter.get("/purchases", [ verifyToken, isAdmin ], listAllPurchases);
purchaseRouter.get("/purchases/:id", [ verifyToken, isCustomer ], listPurchaseById);
purchaseRouter.get("/purchases/products", [ verifyToken, isCustomer ], productsPurchased);
purchaseRouter.post("/purchases", [ verifyToken, isCustomer ], createPurchase);

module.exports = purchaseRouter;