const express = require("express");
const { signUp, signIn } = require("../auth/auth.controller");
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

module.exports = authRouter;