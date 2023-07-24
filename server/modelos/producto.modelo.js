const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Producto = Schema({
    "nombre": String,
    "descripcion": String,
    "precio_vta": Number,
    "medida": String,
    "observacion": String,
    "estado": {
        type: String,
        default: "Activo"
    }
});


module.exports = mongoose.model("producto", Producto);