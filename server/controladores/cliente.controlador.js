const Cliente = require("../modelos/cliente.modelo");

exports.guardar = async (req, res) => {
    console.log(req.body)
    const body = req.body;
    let cliente = new Cliente(body);
    cliente.save().then(() => {
        return res.status(201).send({
            "mensaje": "Registrado correctamente",
            "id": cliente._id,
            "ok": true
        });
    })
        .catch(err => {
            return res.status(400).send({
                "mensaje": "No se pudo registrar al cliente",
                "ok": false
            });
        })

};

exports.agregar_direccion = async (req, res) => {
    const body = req.body;
    const cliente = await Cliente.findOne({ "_id": body.id }).catch(e => null);
    if (cliente) {
        cliente.direcciones.push(body.direccion);

        cliente.save().then(() => {
            return res.status(201).send({
                "mensaje": "Registrado correctamente",
                "id": cliente._id,
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se pudo registrar al cliente",
                    "ok": false
                });
            })
    } else {
        return res.status(404).send({
            "mensaje": "No se encontró el cliente",
            "ok": false
        });
    }

};

exports.obtener_direcciones = async (req, res) => {
    const params = req.params;

    const query = { "_id": params.id };
    const direcciones = await Cliente.findOne(query, "direcciones").catch(e => null);


    if (direcciones) {

        return res.status(200).send({
            "mensaje": "Direcciones Obtenidas",
            "ok": true,
            direcciones: direcciones.direcciones
        });
    } else {
        return res.status(404).send({
            "mensaje": "Direcciones no encontrados",
            "ok": false
        });
    }

};


exports.obtener_clientes = async (req, res) => {

    const clientes = await Cliente.find().catch(e => null);


    if (clientes) {

        return res.status(200).send({
            "mensaje": "Clientes Obtenidos",
            "ok": true,
            clientes: clientes
        });
    } else {
        return res.status(404).send({
            "mensaje": "Clientes no encontrados",
            "ok": false
        });
    }

};

exports.obtener_clientes_activos = async (req, res) => {

    const clientes = await Cliente.find({ "estado": "Activo" }).catch(e => null);


    if (clientes) {

        return res.status(200).send({
            "mensaje": "Clientes Obtenidos",
            "ok": true,
            clientes: clientes
        });
    } else {
        return res.status(404).send({
            "mensaje": "Clientes no encontrados",
            "ok": false
        });
    }

};

exports.obtener_informacion = async (req, res) => {
    const params = req.params;
    const query = { "_id": params.id };
    const cliente = await Cliente.findOne(query).catch(e => null);
    if (cliente) {
        return res.status(200).send({
            "mensaje": "Cliente Obtenidas",
            "ok": true,
            cliente
        });
    } else {
        return res.status(404).send({
            "mensaje": "Cliente no encontrado",
            "ok": false
        });
    }

};

exports.eliminar_direccion = async (req, res) => {
    const params = req.params;
    const query = { "_id": params.idCliente };
    const cliente = await Cliente.findOne(query, "direcciones").catch(e => null);
    if (cliente) {
        cliente.direcciones.filter(d => d._id == params.idDireccion)[0].estado="Eliminado";
        cliente.save().then(() => {
            return res.status(201).send({
                "mensaje": "Dirección Eliminada Satisfactoriamente",
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se logró eliminar la dirección",
                    "ok": false
                });
            })
    } else {
        return res.status(404).send({
            "mensaje": "Cliente no encontrado",
            "ok": false
        });
    }

};

exports.eliminar_cliente = async (req, res) => {
    const params = req.params;
    const query = { "_id": params.idCliente };
    const cliente = await Cliente.findOne(query, "estado").catch(e => null);
    if (cliente) {
        cliente.estado ="Eliminado";
        cliente.save().then(() => {
            return res.status(201).send({
                "mensaje": "Cliente Eliminado Satisfactoriamente",
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se logró eliminar al cliente",
                    "ok": false
                });
            })
    } else {
        return res.status(404).send({
            "mensaje": "Cliente no encontrado",
            "ok": false
        });
    }

};

exports.activar_cliente = async (req, res) => {
    const params = req.params;
    const query = { "_id": params.idCliente };
    const cliente = await Cliente.findOne(query, "estado").catch(e => null);
    if (cliente) {
        cliente.estado ="Activo";
        cliente.save().then(() => {
            return res.status(201).send({
                "mensaje": "Cliente Activado Satisfactoriamente",
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se logró activar al cliente",
                    "ok": false
                });
            })
    } else {
        return res.status(404).send({
            "mensaje": "Cliente no encontrado",
            "ok": false
        });
    }

};