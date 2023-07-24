const express = require('express')
const mongoose = require("mongoose");
const Producto = require('./modelos/producto.modelo');
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");

const PUERTO = 8680;


const rutas_producto = require("./rutas/producto.route");
const rutas_venta = require("./rutas/venta.route");
const rutas_cliente = require("./rutas/cliente.route");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/petApp", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        console.info("[MONGODB] conexión establecida");
        app.listen(PUERTO, () => {
            console.log("Servidor corriendo en el Puerto ", PUERTO);
        })

    })
    .catch(err => {
        console.error("[MONGODB] error en la conexión", err)
    })


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.get('/', function (req, res) {
    res.send({ texto: 'Hello World' })
})

app.use("/api/v1/producto", rutas_producto);
app.use("/api/v1/venta", rutas_venta);
app.use("/api/v1/cliente", rutas_cliente);
app.use("/api/v1/cliente", rutas_cliente);




/*")const producto = new Producto({
    ")"nombre": "Royal Canin",
    "descripcion": "Cachorro",
    "precio_vta": 28000,
    "medida": "18 Kilos",
    "observacion": "Salmón",
    "estado": "activo",
});

producto.save()*/