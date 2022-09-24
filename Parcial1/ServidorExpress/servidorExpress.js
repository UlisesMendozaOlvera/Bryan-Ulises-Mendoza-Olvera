const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const app = express()

app.use(cors())
app.use(express.text())
app.use(express.json())
//app.use(morgan('combined'))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

//Funcion middleware 
// app.use((req, res, next) => {
//     console.log("Primer funcion middleware")
//     next()
// }, (req, res, next) => {
//     console.log("Segunda funcion middleware")
//     next()
// })
//GET
app.get('/', (req, res) => {
    // res.send('Servidor Express contestando')
    res.sendFile('./static/index.html', { root: __dirname }), (err) => { console.log("Archivo enviado") }
})
app.get('/mayusculas/cadena/:', (req, res) => {
    console.log(req.params)
    res.send(req.params)
})
app.get('/suma', (req, res) => {
    console.log(req.query)
    let suma = parseInt(req.query.x) + parseInt(req.query.y)
    res.send('La suma es : ' + suma)
})
//POST
app.post('/', (req, res) => {
    // res.send('Hiciste post al server de express')
    res.json({ 'Usuario': 'Bryan' })
})
app.post('/texto', (req, res) => {
    console.log(req.body)
    let may = req.body.toUpperCase()
    let sinesp = req.body.trim()
    let longi = req.body.length
    res.json({
        mayusculas: may,
        sinespacios: sinesp,
        longitud: longi
    })
})
app.post('/json', (req, res) => {
    console.log(req.body.nombre)
    let cadena = "hola " + req.body.nombre + " " + req.body.apellido + " como estas"
    res.json({ saludo: cadena })
})
//Error 404
app.use('/', (req, res) => {
    // res.send('Servidor Express contestando')
    res.status(404).sendFile('./static/404.html', { root: __dirname })
})

app.listen(8086, function () {

    console.log('Servidor Express correindo en el puerto 8086');
    console.log(__dirname)
})
