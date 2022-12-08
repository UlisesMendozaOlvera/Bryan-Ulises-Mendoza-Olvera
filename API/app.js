const express = require("express");
const cors = require("cors");
const rutas = require("./rutas");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Peliculas",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8086",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./rutas.js")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use(cors({ origin: "*" }));
app.use(express.text());
app.use(express.json());

app.use("/pelicula", rutas.router);

app.listen(8086, function () {
  console.log("Servidor Express correindo en el puerto 8086");
});
