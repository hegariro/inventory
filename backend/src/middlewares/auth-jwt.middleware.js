const jwt = require("jsonwebtoken");
const UserModel = require("../data-presist/user.model");
const ADMIN_LABEL = "administrator";
const CUSTOMER_LABEL = "customer";

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) throw new Error("Token was not setted");

        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret, (err, decode) => {
            if (!!err) throw new Error("Unauthorized");

            req.userId = decode.id;
            next();
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};

const isAdmin = (req, res, next) => {
    UserModel.findByPk(req.userId).then(user => {
        const { dataValues: { rol } } = user;
        if (rol === ADMIN_LABEL) next();
        else return res.status(401).json({ message: "ADMIN role is required" });
    });
};

const isCustomer = (req, res, next) => {
    UserModel.findByPk(req.userId).then(user => {
        const { dataValues: { rol } } = user;
        if (rol === CUSTOMER_LABEL) next();
        else return res.status(401).json({ message: "CUSTOMER role is required" });
    });
};

const authJWT = { verifyToken, isAdmin, isCustomer };
module.exports = authJWT;