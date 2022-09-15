function hacerPeticion() {
    fetch("http://localhost:8082")
        .then(respuesta => respuesta.text())
        .then(datos => console.log(datos))
}