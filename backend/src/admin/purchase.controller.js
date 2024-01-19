const PurchaseOrderModel = require("../data-presist/purchase-order.model");
const PurchaseModel = require("../data-presist/purchase.model");

const getPurchaseOrders = (orderIds) => {
    const orders = [];
    orderIds.map(id => {
        const { dataValues: order } = PurchaseOrderModel.findByPk(id);
        console.log({ order });
        if (!order) return res.status(400).json({ message: `Not exists the order ${id}` });

        orders.push(order);
    });
    return orders;
};

const listAllPurchasesByCustomer = async (req, res) => {
    const { userId } = req;
    const { dataValues: purchases } = await PurchaseModel.findAll({ where: { user_id: userId }});
    if (!purchases) return res.status(400).json({ message: `There are not Purchases made by users` });

    const orders = await getPurchaseOrders(purchases.purchase_orders);
    purchases.orders = orders;
    return res.status(200).json({ purchases });
};

const listAllPurchases = async (req, res) => {
    const { dataValues: purchases } = await PurchaseModel.findAll();
    if (!purchases) return res.status(400).json({ message: `There are not Purchases made by users` });

    const orders = await getPurchaseOrders(purchases.purchase_orders);
    purchases.orders = orders;
    return res.status(200).json({ purchases });
};

module.exports = { listAllPurchases, listAllPurchasesByCustomer };
