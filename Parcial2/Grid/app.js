import express from 'express'
import { pool } from './conectionDB.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({origin:'http://localhost:8086'}))

app.get('/consultar/*', cors(),async (req, res) => {
    
    //console.log('Mensaje : ', DataID);
    const [responseDb] = await pool.query(`SELECT * FROM empleado`)
    res.json(responseDb)
})
app.get('/consultaruno/:id_empleado',async (req, res) => {
    const DataID = req.params.id_empleado;
    //console.log('Mensaje : ', DataID);
    const [responseDb] = await pool.query(`SELECT * FROM empleado WHERE id_empleado=${DataID}`)
    res.json(responseDb)
})
app.post('/insertar', async (req, res) => {
    const valores=[req.body.id_empleado,req.body.nombre,req.body.apellido,req.body.email]
    await pool.execute(`INSERT INTO empleado VALUES (?,?,?,?)`,valores)
    res.json({ 'Resultado': `Empleado insertado ID : ${req.body.id_empleado} Nombre : ${req.body.nombre} Apellido: ${req.body.apellido} Email : ${req.body.email}`})
})
app.put('/actualizar/:id', async (req, res) => {
    const valores = [req.body.id_empleado, req.body.nombre, req.body.apellido, req.body.email,req.params.id]
    await pool.execute(`UPDATE empleado SET id_empleado=?,nombre=?,apellido=?,email=? WHERE empleado.id_empleado=?`,valores)
    res.json({ 'Se Actualizo el Empleado con ID ': req.params.id })
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
