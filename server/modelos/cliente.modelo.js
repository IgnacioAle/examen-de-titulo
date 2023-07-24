const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cliente = Schema({
    "rut": String,
    "nombre": String,
    "apellidos": String,
    "correo": String,
    "telefono": String,
    "estado": {
        type: String,
        default: "Activo"
    },
    "direcciones": [{
        "direccion": String,
        "aclaratoria": String,
        "observacion": String,
        "estado": {
            type: String,
            default: "Activo"
        }
    }]
});


module.exports = mongoose.model("cliente", Cliente);