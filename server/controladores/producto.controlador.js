const Producto = require("../modelos/producto.modelo");



exports.obtener_todos = async (req, res) => {
    const productos = await Producto.find().catch(e => null);


    if (productos) {

        return res.status(200).send({
            "mensaje": "Productos obtenidos Satisfactoriamente",
            "ok": true,
            productos
        });
    } else {
        return res.status(404).send({
            "mensaje": "Productos no encontrados",
            "ok": false
        });
    }

};
exports.obtener = async (req, res) => {
    const params = req.params;

    const producto = await Producto.findOne({"_id":params.id}).catch(e => null);
    if (producto) {

        return res.status(200).send({
            "mensaje": "Producto obtenido Satisfactoriamente",
            "ok": true,
            producto
        });
    } else {
        return res.status(404).send({
            "mensaje": "Producto no encontrados",
            "ok": false
        });
    }

};
exports.obtener_activos = async (req, res) => {
    const query = { "estado": "Activo" };
    const productos = await Producto.find(query).catch(e => null);


    if (productos) {

        return res.status(200).send({
            "mensaje": "Productos obtenidos Satisfactoriamente",
            "ok": true,
            productos
        });
    } else {
        return res.status(404).send({
            "mensaje": "Productos no encontrados",
            "ok": false
        });
    }

};

exports.guardar = async (req, res) => {
    const producto = new Producto(req.body);
    producto.save().then(() => {
        return res.status(201).send({
            "mensaje": "Registrado correctamente",
            "id": producto._id,
            "ok": true
        });
    })
        .catch(err => {
            return res.status(400).send({
                "mensaje": "No se pudo registrar la venta",
                "ok": false
            });
        })

};

exports.modificar = async (req, res) => {

    const producto = req.body;
    const antiguo = await Producto.findOne({ "_id": producto.id }).catch(e => null);
    if (antiguo) {
        antiguo.nombre = producto.nombre;
        antiguo.descripcion = producto.descripcion;
        antiguo.medida = producto.medida;
        antiguo.precio_vta = producto.precio_vta;
        antiguo.observacion = producto.observacion;
        
        antiguo.save().then(() => {
            return res.status(201).send({
                "mensaje": "Registro Modificado Satisfactoriamente",
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se pudo modificar el registro",
                    "ok": false
                });
            })

    }else{
        return res.status(404).send({
            "mensaje": "No se encontró el registro",
            "ok": false
        });
    }

    
};


exports.eliminar = async (req, res) => {

    const params = req.params;
    const producto = await Producto.findOne({ "_id": params.id }).catch(e => null);
    if (producto) {
        producto.estado = "Eliminado";
        
        producto.save().then(() => {
            return res.status(201).send({
                "mensaje": "Registro Eliminado Satisfactoriamente",
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se pudo Eliminar el registro",
                    "ok": false
                });
            })
    }else{
        return res.status(404).send({
            "mensaje": "No se encontró el registro",
            "ok": false
        });
    }

    
};

exports.activar = async (req, res) => {

    const params = req.params;
    const producto = await Producto.findOne({ "_id": params.id }).catch(e => null);
    if (producto) {
        producto.estado = "Activo";
        
        producto.save().then(() => {
            return res.status(201).send({
                "mensaje": "Registro Activado Satisfactoriamente",
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se pudo Activar el registro",
                    "ok": false
                });
            })
    }else{
        return res.status(404).send({
            "mensaje": "No se encontró el registro",
            "ok": false
        });
    }

    
};