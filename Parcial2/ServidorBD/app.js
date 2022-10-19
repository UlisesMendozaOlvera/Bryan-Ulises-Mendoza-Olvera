import express from 'express'
import { pool } from './conectionDB.js'

const app = express()
app.use(express.json())

app.get('/empleado/:id_empleado', async (req, res) => {
    const DataID = req.params.id_empleado;
    //console.log('Mensaje : ', DataID);
    const [responseDb] = await pool.query(`SELECT * FROM empleado WHERE id_empleado=${DataID}`)
    res.json(responseDb)
})

app.listen(8086, function () {

    console.log('Servidor Express correindo en el puerto 8086');

})
