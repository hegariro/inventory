const { DataTypes } = require("sequelize");
const orm = require("./index");

const PurchaseModel = orm.define('purchase', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            isUUID: 4,
        }
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    purchase_orders: {
        type: DataTypes.JSON,
        allowNull: true
    },
    quantity_products:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_price: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0
    }
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = PurchaseModel;