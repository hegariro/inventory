const express = require("express");
const customerRouter = express.Router();

customerRouter.use((req, res, next) => {
    console.info("Time: ", Date.now());
    next();
});

customerRouter.get("/", (req, res) => {
    res.json({ message: "hola mundo cruel" });
});

module.exports = customerRouter;