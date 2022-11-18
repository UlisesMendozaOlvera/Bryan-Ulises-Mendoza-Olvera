const express = require('express');
const cors    = require('cors');
const ruta_empleado =require('./ruta_empleado')


const app= express();
app.use(cors({origin:"*"}))
app.use(express.text());
app.use(express.json());

app.use('/consultar',ruta_empleado.router);

app.listen(8086, function () {

    console.log('Servidor Express correindo en el puerto 8086');

})