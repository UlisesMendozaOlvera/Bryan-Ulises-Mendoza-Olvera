const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
   // res.send('Servidor Express contestando')
    res.sendFile('./static/index.html',{root:__dirname})
})

app.post('/', (req, res) => {
   // res.send('Hiciste post al server de express')
    res.json({'Usuario':'Bryan'})
})
app.use('/', (req, res) => {
    // res.send('Servidor Express contestando')
    res.status(404).sendFile('./static/404.html', { root: __dirname })
})
app.listen(8086, function () {

    console.log('Servidor Express correindo en el puerto 8086');
    console.log(__dirname)
})
