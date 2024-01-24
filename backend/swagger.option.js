const swaggerJsdoc = require("swagger-jsdoc");

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API documentation",
      version: "0.1.0",
      description:
        "Documentación para consumir el API del proyecto ",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "",
        url: "",
        email: "",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Testing server"
      },
    ],
  },
  apis: [
    "./src/auth/*.js",
    "./src/customer/*.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };