const { Sequelize } = require("sequelize");

const dsn = process.env.DB_DSN;

const orm = new Sequelize(dsn);

const connTest = async () => {
    try {
        await orm.authenticate();
        console.info("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

connTest();

module.exports = orm;