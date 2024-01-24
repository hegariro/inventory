const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuid = require('uuid');
const UserModel = require("../data-presist/user.model");
const CUSTOMER_ROLE = "customer";
const EXPIRE_TIME = 86400; // 24 hours

/**
 * 
 * @swagger
 * /api/V1/auth/signup:
 *   post:
 *     summary: Endpoint para registrar un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: nombres del nuevo usuario
 *                 example: "Fulano"
 *               lastname:
 *                 type: string
 *                 description: apellidos del nuevo usuario
 *                 example: "De Tales"
 *               nickname:
 *                 type: string
 *                 description: usuario
 *                 example: "fulanito"
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *                 example: "k#{5BR37%9*+xrU?vN/P"
 *     responses:
 *       '201':
 *         description: Datos del usuario registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: resumen de la acción realizada
 *                   example: "User fulanito was created"
 *                 data:
 *                   type: object
 *                   description: datos del usuario nuevo
 *                   properties:
 *                     id:
 *                       type: uuid
 *                       description: identificador único del usuario
 *                       example: "a6267e9b-fbbd-4f38-8188-c60ab5c13714"
 *                     firstname:
 *                       type: string
 *                       description: nombres del usuario
 *                       example: "Fulano"
 *                     lastname:
 *                       type: string
 *                       description: apellidos del usuario
 *                       example: "De Tales"
 *                     nickname:
 *                       type: string
 *                       description: usuario
 *                       example: "fulanito"
 *       '500':
 *         description: Respuesta de registro fallido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: mensaje de error
 *                   example: "User fulanito was not created"
 * 
 */
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

/**
 * 
 * @swagger
 * /api/V1/auth/signin:
 *   post:
 *     summary: Endpoint para loguear a un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: usuario
 *                 example: "fulanito"
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *                 example: "k#{5BR37%9*+xrU?vN/P"
 *     responses:
 *       '200':
 *         description: Datos del usuario registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: resumen de la acción realizada
 *                   example: "User fulanito was created"
 *                 data:
 *                   type: object
 *                   description: datos del nuevo usuario
 *                   properties:
 *                     userId:
 *                       type: uuid
 *                       description: identificador único del usuario
 *                       example: "a6267e9b-fbbd-4f38-8188-c60ab5c13714"
 *                     username:
 *                       type: string
 *                       description: usuario
 *                       example: "fulanito"
 *                     accessToken:
 *                       type: string
 *                       description: token de acceso
 *                       example: "eyJpZCI6IjIzYTMwNGUyLTY3YmEtNDNjNi04YTQyLTU5YWNkMWEzYzAwNSIsImlhdCI6MTcwNjA3NzYxNSwiZXhwIjoxNzA2MTY0MDE1fQ.eRrqyFLpwxwVLZHwMLaqY69wZ2ELX69xBjc8q_aSs0Q"
 *       '401':
 *         description: Respuesta de contraseña errada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: null
 *                   description: token
 *                   example: null
 *                 message:
 *                   type: string
 *                   description: mensaje de error
 *                   example: "Invalid password"
 *       '500':
 *         description: Respuesta de error inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: mensaje de error
 *                   example: "The token has expired"
 * 
 */
const signIn = (req, res) => {
    const { nickname, password } = req.body;
    UserModel.findOne({ where: { nickname } }).then(user => {
        if (!user)
            return res.status(401).json({ message: `User doesn't exists` });

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