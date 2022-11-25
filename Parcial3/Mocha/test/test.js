
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:8086";
// Encapsular en test dentro de la funcion describe() Y describirmos el test

describe("Inserta un empleado: ", () => {
  it("deberia insertar in empleado", (done) => {
    // En la funcion it() lo que deberia hacer
    chai
      .request(url)
      .post("/consultar/insertar")
      .send({
        id_empleado: "55",
        nombre: "Pena",
        apellido: "Nieto",
        email: "peña@gmail.com",
        
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});
describe("Obtiene empleados: ", () => {
  it("Deberia obtener todos los empleados", (done) => {
    chai
      .request(url)
      .get("/consultar")
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});