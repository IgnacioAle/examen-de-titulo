// Librerias
const express = require("express");

const ControladorCliente = require("../controladores/cliente.controlador");


// Otras dependencias y/o configuraciones
const api = express.Router();

//GET
api.get("/",
    ControladorCliente.obtener_clientes);
    
api.get("/activos",
        ControladorCliente.obtener_clientes_activos);

api.get("/:id",
    ControladorCliente.obtener_informacion);


api.get("/:id/direcciones",
    ControladorCliente.obtener_direcciones);

//POST
api.post("/guardar",
    ControladorCliente.guardar)

//PUT
api.put("/direccion/guardar",
    ControladorCliente.agregar_direccion)

api.put("/:idCliente/activar",
    ControladorCliente.activar_cliente)

    //DELETE
api.delete("/:idCliente/direccion/:idDireccion",
    ControladorCliente.eliminar_direccion)

api.delete("/:idCliente",
    ControladorCliente.eliminar_cliente)
module.exports = api;