import express from 'express'
import { pool } from './conectionDB.js'

const app = express()
app.use(express.json())

app.get('/consultar/*', async (req, res) => {
    
    //console.log('Mensaje : ', DataID);
    const [responseDb] = await pool.query(`SELECT * FROM empleado`)
    res.json(responseDb)
})
app.get('/consultar/:id_empleado',async (req, res) => {
    const DataID = req.params.id_empleado;
    //console.log('Mensaje : ', DataID);
    const [responseDb] = await pool.query(`SELECT * FROM empleado WHERE id_empleado=${DataID}`)
    res.json(responseDb)
})
app.post('/insertar', async (req, res) => {
   
    const id_empleado=req.body.id_empleado;
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const email=req.body.email
    console.log(id_empleado,nombre,apellido,email);
    await pool.execute(`INSERT INTO empleado VALUES (?,?,?,?)`,[id_empleado,nombre,apellido,email])
    res.json({'Resultado':`Empleado insertado ID : ${id_empleado} Nombre : ${nombre} Apellido: ${apellido} Email : ${email}`})
})
app.put('/actualizar/:id_empleado', async (req, res) => {
    const id=req.params.id_empleado;
    const id_empleado = req.body.id_empleado;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    //console.log(id_empleado,nombre,apellido,email)
    await pool.execute(`UPDATE empleado SET id_empleado=?,nombre=?,apellido=?,email=? WHERE empleado.id_empleado=?`,[id_empleado,nombre,apellido,email,id])
    res.json({ 'Se Actualizo el Empleado ': nombre })
})
app.delete('/eliminar/:id_empleado', async (req, res) => {
    const DataID = req.params.id_empleado;
    //console.log('Mensaje : ', DataID);
    const [responseDb] = await pool.query(`DELETE FROM empleado WHERE id_empleado=${DataID}`)
    res.json({'Se Elimino el Empleado con ID ':DataID})
})

app.listen(8086, function () {

    console.log('Servidor Express correindo en el puerto 8086');

})
