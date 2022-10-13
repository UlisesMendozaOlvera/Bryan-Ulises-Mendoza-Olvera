const cadenas={}
const pasarMayusculas = (cadena) => {
    return cadena.toUpperCase()
}
const quitarEspacios = (cadena) => {
    return cadena.trim()
}
const obtenerLongitud = (cadena) => {
    return cadena.length;
}
cadenas.pasarMayusculas = pasarMayusculas;
cadenas.quitarEspacios = quitarEspacios;
cadenas.obtenerLongitud = obtenerLongitud;

module.exports.cadenas