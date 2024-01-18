const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuid = require('uuid');
const UserModel = require("../data-presist/user.model");
const CUSTOMER_ROLE = "customer";
const EXPIRE_TIME = 86400; // 24 hours

const signUp = (req, res) => {
    const { firstname, lastname, nickname, password } = req.body;
    UserModel.create({
        id: uuid.v4(),
        firstname: firstname,
        lastname: lastname,
        nickname,
        rol: CUSTOMER_ROLE,
        passwd: bcrypt.hashSync(password, 8),
    }).then(user => {
        if (!user)
            return res.status(500).json({ message: `User ${nickname} was not created` });
        
        const { id, firstName, lastName, nickname } = user;
        return res.status(201).json({
            data: { id, firstName, lastName, nickname },
            message: `User ${nickname} was created`,
        });
    }).catch(err => {
        return res.status(500).json({
            message: err.message,
        });
    });
};

const signIn = (req, res) => {
    const { nickname, password } = req.body;
    UserModel.findOne({
        where: { nickname }
    }).then(user => {
        if (!user)
            return res.status(401).json({ message: `User does not exists` });

        const passIsValid = bcrypt.compareSync(password, user.passwd);
        if (!passIsValid)
            return res.status(401).json({
                accessToken: null,
                message: "Invalid password"
            });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
            { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: EXPIRE_TIME });
        return res.status(200).json({
            userId: user.id,
            username: user.nickname,
            accessToken: token
        });
    }).catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

const authCtrl = { signUp, signIn };
module.exports = authCtrl;