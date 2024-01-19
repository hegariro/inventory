const { DataTypes } = require("sequelize");
const orm = require("./index");

const PurchaseOrderModel = orm.define('purchase_order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            isUUID: 4,
        }
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = PurchaseOrderModel;