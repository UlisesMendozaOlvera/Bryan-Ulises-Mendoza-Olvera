const express = require("express")


var mySQL = require("mysql")
var router=express.Router()

var con = mySQL.createConnection({
    user: 'root',
    host: '127.0.0.1',
    database: 'empresa',
    password: '',
    port: '3306'
});
/**
* @swagger
* /consultar/*:
*   get:
*        description: consulta todos los empleados
*        responses:
*           200:
*               description: Returns a mysterious string.
*/
router.get('/*', function(req, res) {
    let sql = (`SELECT * FROM empleado`)
    let query = con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    });
})
/**
* @swagger
* /consultar/:id_empleado:
*   get:
*        description: consulta un empleado
*        responses:
*           200:
*               description: Returns a mysterious string.
*/
router.get('/:id_empleado',function(req, res) {
    let sql = (`SELECT * FROM empleado WHERE id_empleado=${req.params.id_empleado}`)
    let query = con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    });
})
/**
* @swagger
* /consultar/insertar:
*   post:
*       description: insertar empleados
*       responses:
*           200:
*           description: Returns a mysterious string.
*/
router.post('/insertar', function (req, res) {
    let valores={'id_empleado':req.body.id_empleado,'nombre':req.body.nombre,'apellido':req.body.apellido,'email':req.body.email}
    let sql=(`INSERT INTO empleado SET ?`)
    let query = con.query(sql,valores,(err,result)=>{
        if(err) throw err;
        res.send({ 'Resultado': `Empleado insertado ID : ${req.body.id_empleado} Nombre : ${req.body.nombre} Apellido: ${req.body.apellido} Email : ${req.body.email}`})
    });
})
/**
* @swagger
* /consultar/:id:
*   put:
*        description: Actualiza un empleado
*        responses:
*           200:
*               description: Returns a mysterious string.
*/
router.put('/:id', (req, res) => {
    
    let valores={'id_empleado':req.body.id_empleado,'nombre':req.body.nombre,'apellido':req.body.apellido,'email':req.body.email}
    let sql=(`UPDATE empleado SET ?  WHERE id_empleado=${req.params.id}`)
    let query = con.query(sql,valores,(err,result)=>{
        if(err) throw err;
        res.send({ 'Se Actualizo el Empleado con ID ': req.params.id })
    });
})
/**
* @swagger
* /consultar/:id_empleado:
*   delete:
*        description: elimina un empleado
*        responses:
*           200:
*               description: Returns a mysterious string.
*/
router.delete('/:id_empleado',  (req, res) => {
   
    let sql=(`DELETE FROM empleado WHERE id_empleado=${req.params.id_empleado}`)
    let query = con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({'Se Elimino el Empleado con ID ':req.params.id_empleado})
     });
})


module.exports.router=router