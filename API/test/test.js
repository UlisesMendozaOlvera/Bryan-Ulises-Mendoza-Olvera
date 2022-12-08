let   chai     = require('chai');
let   chaiHttp = require('chai-http');
const expect   = require('chai').expect;
chai.use(chaiHttp);const url= 'http://localhost:8086';




describe('Obtiene todas las peliculas',()=>{   
    it('Debe obtener todas las peliculas.', (done) => {
        chai.request(url)     
        .get('/pelicula/todas')
        .send()
        .end( function(err,res){
            expect(res).to.have.status(200);   
            expect(res).to.be.json;              
            done();
        });
    });
});

describe("Obtiene todas las peliculas por Año", () => {
  it("Debe obtener todas las peliculas por año", (done) => {
    chai
      .request(url)
      .get("/pelicula/fecha/2022")
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe("Obtiene todas las peliculas por Titulo", () => {
  it("Debe obtener todas las peliculas por titulo", (done) => {
    chai
      .request(url)
      .get("/pelicula/titulo/hex")
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe("Obtiene todas las peliculas Populares", () => {
  it("Debe obtener todas las peliculas populares", (done) => {
    chai
      .request(url)
      .get("/pelicula/popular")
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe("Obtiene todas las peliculas por Categoria", () => {
  it("Debe obtener todas las peliculas por categoria", (done) => {
    chai
      .request(url)
      .get("/pelicula/categoria/accion")
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe("Guardar una pelicula ", () => {
  it(" Debe guardar una pelicula", (done) => {
    chai
      .request(url)
      .post("/pelicula/guardar")
      .send({
        titulo: "Hex 2",
        fecha_estreno: "2021",
        categoria: "Acción, Terror, Suspense",
        puntuacion: "5.1",
        vista_general:"Following a mysterious disappearance on a jump, a group of skydivers experience paranormal occurrences that leave them fighting for their lives.",
        reparto:"Chris Johnston-Director, Andy Malchiodi-Director, Hans Rodionoff-Writer",
        duracion: "2h 4m",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Actualizar una pelicula por titulo ", () => {
  it(" Debe Actualizar una pelicula por titulo", (done) => {
    chai
      .request(url)
      .put("/pelicula/hex")
      .send({
        titulo: "Hex",
        fecha_estreno: "2021",
        categoria: "Acción, Terror, Suspense",
        puntuacion: "5.1",
        vista_general:"Following a mysterious disappearance on a jump, a group of skydivers experience paranormal occurrences that leave them fighting for their lives.",
        reparto:"Chris Johnston-Director, Andy Malchiodi-Director, Hans Rodionoff-Writer",
        duracion: "2h 4m",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Elimina una peliculas por titulo", () => {
  it("Debe eliminar una pelicula por titulo", (done) => {
    chai
      .request(url)
      .delete("/pelicula/titulo")
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});
