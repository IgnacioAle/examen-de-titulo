// Librerias
const express = require("express");
const ControladorProducto = require("../controladores/producto.controlador");

// Otras dependencias y/o configuraciones
const api = express.Router();

//GET
api.get("/", (req, res) => {
    return req.send({ "mensaje": "hola" })
})

api.get("/all",
    ControladorProducto.obtener_todos
)

api.get("/activos",
    ControladorProducto.obtener_activos
)
api.get("/:id",
    ControladorProducto.obtener
)
//POST
api.post("/guardar",
    ControladorProducto.guardar
)

//PUT
api.put("/modificar",
    ControladorProducto.modificar)

api.put("/:id/activar",
    ControladorProducto.activar)
//DELETE

api.delete("/:id",
    ControladorProducto.eliminar
)
module.exports = api;