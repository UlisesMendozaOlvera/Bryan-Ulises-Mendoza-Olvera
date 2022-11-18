const express = require('express');
const cors    = require('cors');
const ruta_empleado =require('./ruta_empleado')

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
definition: {
openapi: '3.0.0',
info: {
title: 'API Empleados',
version: '1.0.0',
},
servers:[
{url: "http://localhost:8086"}
],
},
apis: ["ruta_empleado.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app= express();
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use(cors({origin:"http://localhost"}))
app.use(express.text());
app.use(express.json());

app.use('/consultar',ruta_empleado.router);

app.listen(8086, function () {

    console.log('Servidor Express correindo en el puerto 8086');

})