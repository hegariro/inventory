const express = require('express');
const app = express();
const cors = require('cors');

const authRouter = require("./src/router/auth.router");
const adminRouter = require('./src/router/admin.router');
const purchaseRouter = require('./src/router/purchase.router');

const port = process.env.PORT;
const corsOptions = {
    origin: "http://localhost:3000",
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/V1/auth", authRouter);
app.use("/api/V1/customer", purchaseRouter);
app.use("/api/V1/admin", adminRouter);

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});