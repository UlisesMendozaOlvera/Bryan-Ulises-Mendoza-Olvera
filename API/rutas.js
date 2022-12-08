const express = require("express");

var mySQL = require("mysql");
var router = express.Router();
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(express.text());
app.use(express.json());

var con = mySQL.createConnection({
  user: "root",
  host: "127.0.0.1",
  database: "peliculas",
  password: "",
  port: "3306",
});

/**
* @swagger
* /pelicula/todas:
*    get:
*      tags:
*        - Todas las Peliculas
*      description: Trae todas las peliculas 
*      responses:
*        '200':
*          description: successful operation
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  titulo:
*                       type: string
*                       example: Black Adam 
*                  fecha_estreno:
*                       type: string
*                       example: 2022
*                  categoria:
*                       type: string
*                       example: Acción, Fantasía, Ciencia ficción
*                  puntuacion:
*                       type: string
*                       example: 7.3   
*                  vista_general:
*                       type: string
*                       example: Casi 5.000 años después de haber sido dotado de los poderes omnipotentes de los antiguos dioses y encarcelado con la misma rapidez, Black Adam es liberado de su tumba terrenal, listo para desatar su forma única de justicia en el mundo moderno.
*                  reparto:
*                       type: string
*                       example: Bill Parker-Characters, C.C. Beck-Characters, Jaume Collet-Serra-Director, Adam Sztykiel-Writer, Sohrab Noshirvani-Writer, Rory Haines-Writer
*                  duracion:
*                       type: string
*                       example: 2h 4m
*
*        '404':
*          description:  not found
*/
router.get("/todas", function (req, res) {
  let sql = `SELECT * FROM pelicula`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/**
* @swagger
* /pelicula/fecha/{estreno}:
*    get:
*      tags:
*        - Peliculas por Año
*      description: Trae todas las peliculas de año 
*      parameters:
*        - name: estreno
*          in: path
*          description: Año de la pelicula
*          required: true
*          schema:
*            type: string
*      responses:
*        '200':
*          description: successful operation
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  titulo:
*                       type: string
*                       example: Black Adam 
*                  fecha_estreno:
*                       type: string
*                       example: 2022
*                  categoria:
*                       type: string
*                       example: Acción, Fantasía, Ciencia ficción
*                  puntuacion:
*                       type: string
*                       example: 7.3   
*                  vista_general:
*                       type: string
*                       example: Casi 5.000 años después de haber sido dotado de los poderes omnipotentes de los antiguos dioses y encarcelado con la misma rapidez, Black Adam es liberado de su tumba terrenal, listo para desatar su forma única de justicia en el mundo moderno.
*                  reparto:
*                       type: string
*                       example: Bill Parker-Characters, C.C. Beck-Characters, Jaume Collet-Serra-Director, Adam Sztykiel-Writer, Sohrab Noshirvani-Writer, Rory Haines-Writer
*                  duracion:
*                       type: string
*                       example: 2h 4m
*        '400':
*          description: año invalido o no existen peliculas de ese año
*        '404':
*          description:  not found
 */

router.get("/fecha/:estreno", function (req, res) {
  let sql = `SELECT * FROM pelicula WHERE fecha_estreno=${req.params.estreno}`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  /**
   * @swagger
   * /pelicula/titulo/{titulo}:
   *    get:
   *      tags:
   *        - Peliculas por Titulo
   *      description: Trae todas las peliculas por el titulo
   *      parameters:
   *        - name: titulo
   *          in: path
   *          description: Titulo de la pelicula
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  titulo:
   *                       type: string
   *                       example: Black Adam
   *                  fecha_estreno:
   *                       type: string
   *                       example: 2022
   *                  categoria:
   *                       type: string
   *                       example: Acción, Fantasía, Ciencia ficción
   *                  puntuacion:
   *                       type: string
   *                       example: 7.3
   *                  vista_general:
   *                       type: string
   *                       example: Casi 5.000 años después de haber sido dotado de los poderes omnipotentes de los antiguos dioses y encarcelado con la misma rapidez, Black Adam es liberado de su tumba terrenal, listo para desatar su forma única de justicia en el mundo moderno.
   *                  reparto:
   *                       type: string
   *                       example: Bill Parker-Characters, C.C. Beck-Characters, Jaume Collet-Serra-Director, Adam Sztykiel-Writer, Sohrab Noshirvani-Writer, Rory Haines-Writer
   *                  duracion:
   *                       type: string
   *                       example: 2h 4m
   *        '400':
   *          description: titulo invalido o no existe 
   *        '404':
   *          description:  not found
   */
});
router.get("/titulo/:titulo", function (req, res) {
  let sql = `SELECT * FROM pelicula WHERE titulo LIKE '%${req.params.titulo}%'`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/**  
* @swagger
* /pelicula/popular:
*  get:
*    tags:
*       - Peliculas Populares
*    description: Obtiene todas las peliculas populares
*    responses:
*      200:
*        description: Lista de peliculas
*        content:
*          application/json:
*            schema:
*              
*/
router.get("/popular", function (req, res) {
  let sql = `SELECT * FROM pelicula WHERE puntuacion >= '6.9'`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
/**
* @swagger
* /pelicula/categoria/{categoria}:
*    get:
*      tags:
*        - Peliculas por Categoria
*      description: Trae todas las peliculas por categoria
*      parameters:
*        - name: categoria
*          in: path
*          description: Peliculas por su categoria
*          required: true
*          schema:
*            type: string
*      responses:
*        '200':
*          description: successful operation
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  titulo:
*                       type: string
*                       example: Black Adam 
*                  fecha_estreno:
*                       type: string
*                       example: 2022
*                  categoria:
*                       type: string
*                       example: Acción, Fantasía, Ciencia ficción
*                  puntuacion:
*                       type: string
*                       example: 7.3   
*                  vista_general:
*                       type: string
*                       example: Casi 5.000 años después de haber sido dotado de los poderes omnipotentes de los antiguos dioses y encarcelado con la misma rapidez, Black Adam es liberado de su tumba terrenal, listo para desatar su forma única de justicia en el mundo moderno.
*                  reparto:
*                       type: string
*                       example: Bill Parker-Characters, C.C. Beck-Characters, Jaume Collet-Serra-Director, Adam Sztykiel-Writer, Sohrab Noshirvani-Writer, Rory Haines-Writer
*                  duracion:
*                       type: string
*                       example: 2h 4m
*        '400':
*          description: categoia invalido o no existen peliculas de esa categoria
*        '404':
*          description:  not found
 */
router.get("/categoria/:categoria", function (req, res) {
  let sql = `SELECT * FROM pelicula WHERE categoria LIKE '%${req.params.categoria}%'`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/**
* @swagger
* /pelicula/guardar:
*    post:
*      tags:
*        - Guardar una pelicula
*      description: Guardar una pelicula
*      requestBody:
*        description: Datos de la pelicula
*        content:
*          application/json:
*            schema:
*                type: object
*                properties:
*                  titulo:
*                       type: string
*                       example: Black Adam 
*                  fecha_estreno:
*                       type: string
*                       example: 2022
*                  categoria:
*                       type: string
*                       example: Acción, Fantasía, Ciencia ficción
*                  puntuacion:
*                       type: string
*                       example: 7.3
*                  vista_general:
*                       type: string
*                       example: Casi 5.000 años después de haber sido dotado de los poderes omnipotentes de los antiguos dioses y encarcelado con la misma rapidez
*                  reparto:
*                       type: string
*                       example: Bill Parker-Characters, C.C. Beck-Characters, Jaume Collet-Serra-Director, Adam Sztykiel-Writer, Sohrab Noshirvani-Writer, Rory Haines-Writer
*                  duracion:
*                       type: string
*                       example: 2h 4m
*      responses:
*        '200':
*          description: successful operation
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  Pelicula guardada titulo:
*                       type: string
*                       example: Black Adam 
*        '400':
*          description: no se pudo guardar
*        '404':
*          description:  not found
 */
router.post("/guardar", function (req, res) {
  let valores = {
    titulo: req.body.titulo,
    fecha_estreno: req.body.fecha_estreno,
    categoria: req.body.categoria,
    puntuacion: req.body.puntuacion,
    vista_general: req.body.vista_general,
    reparto: req.body.reparto,
    duracion: req.body.duracion
  };
  let sql = `INSERT INTO pelicula SET ? `;
  let query = con.query(sql, valores, (err, result) => {
    if (err) throw err;
    res.send({
      Resultado: `Pelicula Guardada Titulo : ${req.body.titulo}`,
    });
  });
});
/**
* @swagger
* /pelicula/{titulo}:
*    put:
*      tags:
*        - Actualizar una pelicula por titulo
*      description: Actualiza una pelicula por titulo
*      parameters:
*        - name: titulo
*          in: path
*          description: Titulo de la pelicula
*          required: true
*          schema:
*            type: string
*      requestBody:
*        description: Json de la Pelicula
*        content:
*          application/json:
*            schema:
*                type: object
*                properties:
*                  titulo:
*                       type: string
*                       example: Black Adam 
*                  fecha_estreno:
*                       type: string
*                       example: 2022
*                  categoria:
*                       type: string
*                       example: Acción, Fantasía, Ciencia ficción
*                  puntuacion:
*                       type: string
*                       example: 7.3
*                  vista_general:
*                       type: string
*                       example: Casi 5.000 años después de haber sido dotado de los poderes omnipotentes de los antiguos dioses y encarcelado con la misma rapidez
*                  reparto:
*                       type: string
*                       example: Bill Parker-Characters, C.C. Beck-Characters, Jaume Collet-Serra-Director, Adam Sztykiel-Writer, Sohrab Noshirvani-Writer, Rory Haines-Writer
*                  duracion:
*                       type: string
*                       example: 2h 4m
*      responses:
*        '200':
*          description: successful operation
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  Se Actualizo el pelicula con el titulo:
*                       type: string
*                       example: Black Adam 
*        '400':
*          description: año invalido o no existen peliculas de ese año
*        '404':
*          description:  not found
 */
router.put("/:titulo", (req, res) => {
  let valores = {
    titulo: req.body.titulo,
    fecha_estreno: req.body.fecha_estreno,
    categoria: req.body.categoria,
    puntuacion: req.body.puntuacion,
    vista_general: req.body.vista_general,
    reparto: req.body.reparto,
    duracion: req.body.duracion,
  };
  let sql = `UPDATE pelicula SET ?  WHERE titulo LIKE '%${req.params.titulo}%'`;
  let query = con.query(sql, valores, (err, result) => {
    if (err) throw err;
    res.send({ "Se Actualizo el pelicula con el titulo ": req.params.titulo });
  });
});
/**
* @swagger
* /pelicula/{titulo}:
*    delete:
*      tags:
*        - Eliminar una pelicula por titulo
*      description: Eliminar una pelicula por titulo
*      parameters:
*        - name: titulo
*          in: path
*          description: Titulo de la pelicula
*          required: true
*          schema:
*            type: string
*      responses:
*        '200':
*          description: successful operation
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  Se elimino la  pelicula con el titulo:
*                       type: string
*                       example: Black Adam 
*        '400':
*          description: año invalido o no existen peliculas de ese año
*        '404':
*          description:  not found
 */
router.delete("/:titulo", (req, res) => {
  let sql = `DELETE FROM pelicula WHERE titulo LIKE '%${req.params.titulo}%'`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ "Se Elimino el pelicula con el titulo ": req.params.titulo });
  });
});

module.exports.router = router;
