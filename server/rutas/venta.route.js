// Librerias
const express = require("express");

const ControladorVenta = require("../controladores/venta.controlador");


// Otras dependencias y/o configuraciones
const api = express.Router();

//GET
api.get("/pdf/:id",
    ControladorVenta.generar_pdf
)

api.get("/qr/:id",
    ControladorVenta.crearQr
)

api.get("/imprimir/:id",
    ControladorVenta.imprimir_pdf
)

//POST
api.post("/guardar",
    ControladorVenta.guardar)

api.post("/enviar",
    ControladorVenta.enviar)

//PUT
api.put("/actualizar",
    ControladorVenta.modificar)

//DELETE



module.exports = api;