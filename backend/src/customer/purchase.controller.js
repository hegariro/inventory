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
 * @api         {post} /api/V1/customer/purchases
 * @apiName     CreatePurchase
 * @apiGroup    Customer
 * 
 * @apiBody     (Login) {Date}      purchaseDate       Fecha de realización de la compra 
 * @apiBody     (Login) {Object}    orders             Objeto que contiene las órdenes de compra. 
 *                                                     Cada orden de compra debe contener los atributos
 *                                                     productId {UUID} Identificador de producto
 *                                                     quantity {number} Cantidad de productos
 *                                                     subtotal {number} Valor de la órden de compra
 * 
 * @apiSuccess  {UUID}              id                 identificador único de la compra
 * @apiSuccess  {Date}              purchase_date      fecha de realización de la compra
 * @apiSuccess  {UUID}              user_id            identificador único del usuario
 * @apiSuccess  {JSON}              purchase_orders    objeto con los IDs de orden
 * @apiSuccess  {number}            quantity_products  cantidad total de productos comprados
 * @apiSuccess  {number}            total_price        precio total de compra
 * @apiSuccess  {Date}              created_at         fecha de creación del registro
 * @apiSuccess  {Date}              updated_at         fecha de la última actualización del registro
 * 
 * @apiError    {String}            message            mensaje de error
 * 
 * @returns 
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
