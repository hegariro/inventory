const ProductModel = require("../data-presist/product.model");
const PurchaseOrderModel = require("../data-presist/purchase-order.model");
const PurchaseModel = require("../data-presist/purchase.model");
const uuid = require("uuid");

const createOrders = async (orders) => {
    let orderIds = new Array();
    let totalItems = 0
    let total = 0;

    for (let order of orders) {
        const { productId, quantity, subtotal } = order;
        totalItems += Number(quantity);
        total += Number(subtotal);
        const result = await PurchaseOrderModel.create({
            id: uuid.v4(),
            product_id: productId,
            quantity: Number(quantity),
            subtotal: Number(subtotal)
        });
        const { id } = result.dataValues;
        orderIds.push(id);
    }

    return { orderIds, totalItems, total };
};

/**
 * 
 * @swagger
 * /api/V1/customer/purchases:
 *   post:
 *     summary: Endpoint para registrar una compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseDate:
 *                 type: date
 *                 description: fecha de realización de la compra
 *                 example: "2006-01-20"
 *               orders:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: uuid
 *                     description: identificador único de producto
 *                     example: "a5ea0fcc-308c-494e-8db7-27cb954241df"
 *                   quantity:
 *                     type: number
 *                     description: cantidad de productos comprados
 *                     example: "241"
 *                   subtotal:
 *                     type: number
 *                     description: valor de la orden (precio del producto * cantidad de productos)
 *                     example: "49400"
 *     responses:
 *       '201':
 *         description: Registro de compra exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchase:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: uuid
 *                       description: identificador único de la compra
 *                       example: "a5ea0fcc-308c-494e-8db7-27cb954241df"
 *                     user_id:
 *                       type: uuid
 *                       description: identificador único del usuario
 *                       example: "a5ea0fcc-308c-494e-8db7-27cb954241df"
 *                     purchase_date:
 *                       type: date
 *                       description: fecha de realización de la compra
 *                       example: "2024-01-22"
 *                     quantity_products:
 *                       type: number
 *                       description: cantidad total de productos comprados
 *                       example: "200"
 *                     total_price:
 *                       type: number
 *                       description: valor total de la compra
 *                       example: "2003500"
 *                     created_at:
 *                       type: date
 *                       description: fecha de registro de la compra
 *                       example: "2024-01-22"
 *                     updated_at:
 *                       type: date
 *                       description: fecha de la última actualización del registro
 *                       example: "2024-01-22"
 *                     purchase_orders:
 *                       type: array
 *                       items:
 *                         type: number
 *                         description: identificador único de la compra
 *                     orders:
 *                       type: array
 *                       description: Contiene un array con las órdenes de compra
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: uuid
 *                             description: Identificador único de la órden de compra
 *                             example: "a6267e9b-fbbd-4f38-8188-c60ab5c13714"
 *                           product_id:
 *                             type: uuid
 *                             description: Identificador único del producto
 *                             example: "a6267e9b-fbbd-4f38-8188-c60ab5c13714"
 *                           quantity:
 *                             type: number
 *                             description: Cantidad total de productos disponibles
 *                             example: "714"
 *                           subtotal:
 *                             type: number
 *                             description: Valor de la órden de compra
 *                             example: "2765200.00"
 *                           created_at:
 *                             type: date
 *                             description: Fecha de creación de la órden
 *                             example: "2024-01-22"
 *                           updated_at:
 *                             type: date
 *                             description: Fecha de la última actualización de la órden
 *                             example: "2024-01-22"
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
 *                   example: The purchase failed
 * 
 */
const createPurchase = async (req, res) => {
    const { purchaseDate, orders } = req.body;
    const { orderIds, totalItems, total } = createOrders(orders);
    console.debug(orderIds, totalItems, total);
    const { dataValues: purchase } = await PurchaseModel.create({
        id: uuid.v4(),
        purchase_date: purchaseDate,
        user_id: req.userId,
        purchase_orders: JSON.stringify(orderIds),
        quantity_products: Number(totalItems),
        total_price: Number(total)
    });
    if (!purchase) return res.status(500).json({ message: `The purchase failed` });

    return res.status(201).json({ purchase });
};

/**
 * 
 * @swagger
 * /api/V1/customer/purchases/{id}:
 *   get:
 *     summary: Endpoint para buscar una compra utilizando el id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: identificador único del usuario
 *         schema:
 *           type: uuid
 *     responses:
 *       '200':
 *         description: Datos de la compra solicitada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchase:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: uuid
 *                       description: identificador único de la compra
 *                       example: "a5ea0fcc-308c-494e-8db7-27cb954241df"
 *                     user_id:
 *                       type: uuid
 *                       description: identificador único del usuario
 *                       example: "a5ea0fcc-308c-494e-8db7-27cb954241df"
 *                     purchase_date:
 *                       type: date
 *                       description: fecha de realización de la compra
 *                       example: "2024-01-22"
 *                     quantity_products:
 *                       type: number
 *                       description: cantidad total de productos comprados
 *                       example: "200"
 *                     total_price:
 *                       type: number
 *                       description: valor total de la compra
 *                       example: "2003500"
 *                     created_at:
 *                       type: date
 *                       description: fecha de registro de la compra
 *                       example: "2024-01-22"
 *                     updated_at:
 *                       type: date
 *                       description: fecha de la última actualización del registro
 *                       example: "2024-01-22"
 *                     purchase_orders:
 *                       type: array
 *                       items:
 *                         type: number
 *                         description: identificador único de la compra
 *                     orders:
 *                       type: array
 *                       description: Contiene un array con las órdenes de compra
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: uuid
 *                             description: Identificador único de la órden de compra
 *                             example: "a6267e9b-fbbd-4f38-8188-c60ab5c13714"
 *                           product_id:
 *                             type: uuid
 *                             description: Identificador único del producto
 *                             example: "a6267e9b-fbbd-4f38-8188-c60ab5c13714"
 *                           quantity:
 *                             type: number
 *                             description: Cantidad total de productos disponibles
 *                             example: "714"
 *                           subtotal:
 *                             type: number
 *                             description: Valor de la órden de compra
 *                             example: "2765200.00"
 *                           created_at:
 *                             type: date
 *                             description: Fecha de creación de la órden
 *                             example: "2024-01-22"
 *                           updated_at:
 *                             type: date
 *                             description: Fecha de la última actualización de la órden
 *                             example: "2024-01-22"
 *       '400':
 *         description: Respuesta de búsqueda fallida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: mensaje de error
 *                   example: The purchase a6267e9b-fbbd-4f38-8188-c60ab5c13714 was not found
 * 
 */
const listPurchaseById = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const { dataValues: purchase } = await PurchaseModel.findAll({ where: {
        id,
        user_id: userId
    }});
    if (!purchase) return res.status(400).json({ message: `The purchase ${id} was not found` });

    return res.status(200).json({ purchase });
};

const getPurchaseOrders = (orderIds) => {
    const orders = [];
    orderIds.map(async (id) => {
        const { dataValues: order } = await PurchaseOrderModel.findByPk(id);
        orders.push(order);
    });
    return orders;
};

const getProducts = (productIds) => {
    const products = [];
    productIds.map(async (id) => {
        const { dataValues: product } = await ProductModel.findByPk(id);
        products.push(product);
    });
    return products;
};

/**
 * 
 * @swagger
 * /api/V1/customer/purchases/products:
 *   get:
 *     summary: Endpoint para obtener todos los productos comprados por un usuario
 *     responses:
 *       '200':
 *         description: Datos de los productos comprados por un usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   description: Contiene un array con los productos
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: uuid
 *                         description: identificador único del producto
 *                         example: "a6267e9b-fbbd-4f38-8188-c60ab5c13714"
 *                       name:
 *                         type: string
 *                         description: nombre del producto
 *                         example: "Producto uno"
 *       '204':
 *         description: Respuesta cuando el usuario no tiene compras asociadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: mensaje de error
 *                   example: User a6267e9b-fbbd-4f38-8188-c60ab5c13714 has not purchases
 * 
 */
const productsPurchased = async (req, res) => {
    const { userId } = req;
    const { dataValues: purchases } = await PurchaseModel.findAll({ where: { user_id: userId }});
    if (!purchases) return res.status(204).json({ message: `User ${userId} has not purchases` });
    
    const ids = [];
    purchases.map(({ purchase_orders }) => {
        const orders = getPurchaseOrders(purchase_orders);
        const productIds = orders.reduce((result, { product_id }) => {
            if (!result.includes(product_id)) result.push(product_id);
            return result;
        }, []);
        productIds.map(id => (!ids.includes(id) && ids.push(id)));
    });
    const products = getProducts(ids);
    return res.status(200).json({ products });
};

module.exports = { createPurchase, listPurchaseById, productsPurchased };
