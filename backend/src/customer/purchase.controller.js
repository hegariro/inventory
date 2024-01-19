const ProductModel = require("../data-presist/product.model");
const PurchaseOrderModel = require("../data-presist/purchase-order.model");
const PurchaseModel = require("../data-presist/purchase.model");
const uuid = require("uuid");

const createOrders = (orders) => {
    const orderIds = [];
    let totalItems, total = 0;
    orders.map(async ({ productId, quantity, subtotal }) => {
        totalItems += quantity;
        total += subtotal;
        const { dataValues: { id } } = await PurchaseOrderModel.create({
            id: uuid.v4(),
            product_id: productId,
            quantity,
            subtotal
        });
        orderIds.push(id);
    });
    return { orderIds, totalItems, total };
};

const createPurchase = async (req, res) => {
    const { purchaseDate, orders } = req.body;
    const { orderIds, totalItems, total } = createOrders(orders);
    const { dataValues: purchase } = await PurchaseModel.create({
        id: uuid.v4(),
        purchase_date: purchaseDate,
        user_id: req.userId,
        purchase_orders: orderIds,
        quantity_products: totalItems,
        total_price: total
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
