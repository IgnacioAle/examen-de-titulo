const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Venta = Schema({
    "detalle": {
        "fecha": {
            type: Date,
            default: () => Date.now()
        },
        "subtotal": Number,
        "descuento": Number,
        "total": Number,
        "observacion": String
    },
    "cliente": {
        "_id": { type: Schema.ObjectId, ref: "cliente" },
        "rut": String,
        "nombre": String,
        "apellidos": String,
    },
    "despacho": {
        "direccion": String,
        "aclaratoria": String,
        "observacion": String,
    },
    "productos": [{
        "_id": { type: Schema.ObjectId, ref: "producto" },
        "nombre": String,
        "descripcion": String,
        "precio_vta": Number,
        "medida": String,
        "cantidad": Number
    }],
});


module.exports = mongoose.model("venta", Venta);