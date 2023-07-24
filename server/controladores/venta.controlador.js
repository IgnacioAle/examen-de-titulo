const Venta = require("../modelos/venta.modelo");
var pdf = require("pdf-creator-node");
const nodemailer = require('nodemailer');
var fs = require("fs");
var QRCode = require('qrcode');
var moment = require("moment");
var print = require("unix-print");
moment.locale("es")

const Handlebars = require("handlebars");
Handlebars.registerHelper('mult', function (uno, dos) {
    lvalue = parseFloat(uno);
    rvalue = parseFloat(dos);
    return lvalue * rvalue;
});
Handlebars.registerHelper('obs', function (observacion) {
    return observacion ? observacion : "Sin observación";
});
Handlebars.registerHelper('nombre', function (nombre) {
    return nombre ? nombre.toUpperCase() : "S/I";
});
Handlebars.registerHelper('img', function (nombre) {
    return "http://localhost:8680/api/v1/venta/qr/" + nombre;
});
Handlebars.registerHelper('fecha', function (fecha) {
    return moment(fecha).format("dddd DD MMM YYYY - HH:mm:ss");
});
async function enviar_correo(destino, asunto, mensaje, adjunto) {
    let servidorMail = "mail.workspacenow.cl";
    let usuarioMail = "soporte@workspacenow.cl"
    let passMail = "UnoDosTres12_#.";

    var transporter = nodemailer.createTransport({
        host: servidorMail,
        port: 465,
        secure: true,
        auth: {
            user: usuarioMail,
            pass: passMail
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: '"Ventas de Pet Company 💕" <soporte@workspacenow.cl>',
        to: destino,
        subject: asunto,
        html: mensaje
    };

    if (adjunto) {
        mailOptions = {
            from: '"Ventas de Pet Company 💕" <soporte@workspacenow.cl>',
            to: destino,
            subject: asunto,
            html: mensaje,
            attachments: [adjunto]
        };
    }

    await transporter.sendMail(mailOptions, function (error, info) {
        console.log(error);
        console.log(info);

        if (error) {
            console.log("Error al enviar correo ", error)
        } else {
            console.log("Correo enviado Satisfactoriamente");
        }
    });
}

async function crear_pdf(venta) {
    console.log(venta);

    var html = fs.readFileSync("./util/templates/template.html", "utf8");
    var options = {
        format: "Letter",
        orientation: "portrait",
        border: "10mm",

        footer: {
            height: "28mm",
            contents: {
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            }
        },
    };

    var document = {
        html: html,
        data: {
            venta,
        },
        path: "./salidas/V" + venta._id + ".pdf",
        type: "",
    };

    return await pdf
        .create(document, options)
        .then((resp) => {
            console.log(resp);
            return { ok: true, archivo: resp.filename, mensaje: "Generación PDF OK" };
        })
        .catch((error) => {
            console.error(error);
            return { ok: false, mensaje: error };
        });
}

exports.crearQr = async (req, res) => {
    const params = req.params;
    let folio = params.id;
    let imagen = "./salidas/" + folio + '.png';
    QRCode.toFile(imagen, folio, {
        color: {
            dark: '#000',  // Blue dots
            light: '#FFFFFF' // Transparent background
        }
    }, function (err) {
        if (err) throw err
        console.log('done')
        res.sendFile("/home/toor/Trabajos/Personal/Venta/server/salidas/" + folio + ".png");
    })

}

exports.generar_pdf = async (req, res) => {
    const params = req.params;
    const query = { "_id": params.id };
    const venta = await Venta.findOne(query).lean().catch(e => null);
    if (venta) {
        //     console.log(venta);
        let resp = await crear_pdf(venta).catch(e => null);
        console.log(resp);
        if (resp.ok) {
            res.sendFile(resp.archivo);
        } else {
            console.log(resp.mensaje)
        }
    }
};

exports.imprimir_pdf = async (req, res) => {
    const params = req.params;
    const query = { "_id": params.id };
    const venta = await Venta.findOne(query).lean().catch(e => null);
    if (venta) {
        //     console.log(venta);
        let resp = await crear_pdf(venta).catch(e => null);
        console.log(resp);
        if (resp.ok) {
            print.print(resp.archivo);
            res.sendFile(resp.archivo);
        } else {
            console.log(resp.mensaje)
        }
    }
};

exports.guardar = async (req, res) => {
    console.log(req.body)
    const body = req.body;
    let venta = new Venta(body);
    venta.save().then(() => {
        return res.status(201).send({
            "mensaje": "Registrado correctamente",
            "id": venta._id,
            "ok": true
        });
    })
        .catch(err => {
            return res.status(400).send({
                "mensaje": "No se pudo registrar la venta",
                "ok": false
            });
        })
}

exports.modificar = async (req, res) => {
    const body = req.body;
    const venta = await Venta.findOne({ "_id": body.id }).catch(e => null);
    if (venta) {
        venta.detalle = body.detalle;
        venta.cliente = body.cliente;
        venta.despacho = body.despacho;
        venta.productos = body.productos;
        venta.save().then(() => {
            return res.status(201).send({
                "mensaje": "Registrado correctamente",
                "id": venta._id,
                "ok": true
            });
        })
            .catch(err => {
                return res.status(400).send({
                    "mensaje": "No se pudo registrar la venta",
                    "ok": false
                });
            })
    } else {
        return res.status(404).send({
            "mensaje": "Registro no encontrado",
            "ok": false
        });
    }
}

exports.enviar = async (req, res) => {
    const query = { "_id": req.body.id };
    const venta = await Venta.findOne(query).lean().catch(e => null);
    if (venta) {
        //     console.log(venta);
        let resp = await crear_pdf(venta).catch(e => null);
        console.log(resp);
        if (resp.ok) {
            print.print(resp.archivo);
            var adjunto = {
                filename: req.body.id+".pdf",
                path: resp.archivo,
                contentType: "application/pdf"
        
            };
            await enviar_correo("nacho_ch3@hotmail.com","Se Adjunta Información de Venta","Adjunto encontrará un PDF con la información de la venta", adjunto);
            return res.status(201).send({
                "mensaje": "Enviado Satisfactoriamente",
                "ok": true
            });
        } else {
            console.log(resp.mensaje);
            return res.status(400).send({
                "mensaje": "No se logró Enviar el Correo",
                "ok": true
            });

        }
    }else {
        return res.status(404).send({
            "mensaje": "Registro no encontrado",
            "ok": false
        });
    }
}