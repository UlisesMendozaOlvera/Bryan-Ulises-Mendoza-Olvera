const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())


//app.use(express.static('Proyecto'));

app.get('/', (req, res) => {
    res.send('Servidor Express contestando')
})

app.post('/', (req, res) => {
    res.send('Hiciste post al server de express')
})

app.listen(8085, function () {

    console.log('Servidor http correindo en el puerto 8082');
})
