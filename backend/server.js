const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");

const app = express();
const authRouter = require("./src/router/auth.router");
const adminRouter = require('./src/router/admin.router');
const purchaseRouter = require('./src/router/purchase.router');
const { specs } = require("./swagger.option");

const port = process.env.PORT || 3000;
const corsOptions = {
    origin: `http://localhost:${port}`,
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/V1/auth", authRouter);
app.use("/api/V1/customer", purchaseRouter);
app.use("/api/V1/admin", adminRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});