const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Servidor Express contestando')
  
})

app.post('/', (req, res) => {
   res.send('Hiciste post al server de express')
   
})
app.use('/', (req, res) => {
     res.send('Servidor Express contestando')
})
app.listen(8086, function () {

    console.log('Servidor Express correindo en el puerto 8086');
   
})
