const ProductModel = require("../data-presist/product.model");
const uuid = require('uuid');

const listAllProducts = async (req, res) => {
    const products = await ProductModel.findAll();
    if (!products) return res.status(400).json({
        message: "there are not products registered"
    });

    return res.status(200).json({ products });
};

const listProductByID = async (req, res) => {
    const { id } = req.params;
    const data = await ProductModel.findByPk(id);
    if (!data) return res.status(400).json({ message: `Product ${id} was not found` });

    const { dataValues } = data;
    return res.status(200).json({ product: dataValues });
};

const createProduct = async (req, res) => {
    const { lotNumber, name, price, quantity, admissionDate } = req.body;
    const { dataValues } = await ProductModel.create({
        id: uuid.v4(),
        lot_number: lotNumber,
        name,
        price,
        quantity,
        admission_date: admissionDate
    });
    if (!dataValues) return res.status(500).json({ message: `Product ${name} was not created` });

    return res.status(201).json({ product: dataValues });
};

const updateProduct = async (req, res) => {
    console.debug("Params", req.params);
    const { id } = req.params;
    const { lotNumber, name, price, quantity, admissionDate } = req.body;

    const tx = await ProductModel.update({
        lot_number: lotNumber,
        name,
        price,
        quantity,
        admission_date: admissionDate
    }, { where: { id }});
    if (!tx) return res.status(400).json({ message: `Product ${id} was not updated` });

    return res.status(200).json({ message: `${tx} product was updated` });
};

const deleteProduct = async (req, res) => {
    console.debug("Params", req.params);
    const { id } = req.params;
    const tx = await ProductModel.destroy({ where: { id }});
    if (!tx) return res.status(400).json({ message: `Product ${id} was not deleted` });

    return res.status(200).json({ message: `${tx} product was deleted. ID ${id}` });
};

const productCtrl = { listAllProducts, listProductByID, createProduct, updateProduct, deleteProduct };
module.exports = productCtrl;