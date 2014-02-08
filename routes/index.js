/*
 * GET home page.
 */
//Obtencion del modelo 'articulosModel' para emplear sus metodos
var articuloModel = require('../models/articulos');
var usuarioModel = require('../models/usuarios');
var pedidoModel = require('../models/pedidos');
var usuario = undefined;
var usuarioLogin = undefined;

//Ruteo de la aplicación
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {usuario: usuario});
    });

//mostrar tablets
    app.get('/tablets/:pulgadas', function (req, res) {
        var pulgadas = req.params.pulgadas;
        articuloModel.getTablets(pulgadas, function (err, results) {
            res.render('catalogo', { art: results, title: "Tablets " + pulgadas + "\"", articulos: articuloModel, n: results.length, usuario: usuario, usuarioLogin: usuarioLogin});
        });
    });

    //mostrar smartphones
    app.get('/smartphones/:tipo', function (req, res) {
        var tipo = req.params.tipo;
        articuloModel.getMoviles(tipo, function (err, results) {
            res.render('catalogo', { art: results, title: "Smartphones " + tipo, articulos: articuloModel, n: results.length, usuario: usuario, usuarioLogin: usuarioLogin});
        });
    });

    app.get('/smartTV/:pulgadas', function (req, res) {
        var pulgadas = req.params.pulgadas;
        articuloModel.getTVs(pulgadas, function (err, results) {
            res.render('catalogo', { art: results, title: "Smart TVs " + pulgadas + "\"", articulos: articuloModel, n: results.length, usuario: usuario, usuarioLogin: usuarioLogin});
        });
    });

    //Mostrar página emergente con el detalle del artículo (ficha técnica)
    app.get('/catalogo/:modelo', function (req, res) {
        var modelo = req.params.modelo;
        articuloModel.getArticulosCatalogo(modelo, function (err, results) {
            res.render('fichaTecnica', {art: results[0], articulos: articuloModel, usuario: usuario, usuarioLogin: usuarioLogin});
        });
    });

    app.get('/compra/:ean', function (req, res) {
        var ean = req.params.ean;
        pedidoModel.setPedido(usuarioLogin, ean, function () {
            res.render('exitoRegistro');
        });
    });

    app.get('/actualiza/:ean', function (req, res) {
        var ean = req.params.ean;
        articuloModel.getArticuloByEan(ean, function (err, results) {
            res.render('modArticulo', {art: results[0], usuario: usuario, usuarioLogin: usuarioLogin});
        });
    });

    app.get('/registro', function (req, res) {
        res.render('registro');
    });

    app.get('/:orden', function (req, res) {
        if (req.params.orden === 'logoff') {
            usuario = undefined;
            usuarioLogin = undefined;
            console.log('Me desconecto...');
            res.render('index', {usuario: usuario, usuarioLogin: usuarioLogin});
        } else if (req.params.orden === "pedidos") {
            pedidoModel.getPedidos(usuarioLogin, function (err, results) {
                res.render('pedidosUsuario', { ped: results, title: "Pedidos de " + usuarioLogin, pedidos: pedidoModel, n: results.length, usuario: usuario, usuarioLogin: usuarioLogin});
            });
        } else if (req.params.orden === "nuevoArticulo") {
            res.render('altaArticulo', {usuario: usuario, usuarioLogin: usuarioLogin});
        } else if (req.params.orden === "cuenta") {
            usuarioModel.getUserData(usuarioLogin, function (err, results) {
                res.render('datosUsuario', {usr: results[0], usuario: usuario, usuarioLogin: usuarioLogin});
            });
        }
    });

    app.post('/busqueda', function (req, res) {
        console.log(req.body.buscar);
        articuloModel.getArticulos(req.body.buscar, function (err, results) {
            res.render('catalogo', { art: results, title: "Resultados de la búsqueda", articulos: articuloModel, n: results.length, usuario: usuario, usuarioLogin: usuarioLogin});
        });
    });

    app.post('/', function (req, res) {
        usuarioModel.getPass(req.body.nUsuario, req.body.clave, function (err, results) {
            if (results.length !== 0) {
                usuario = results[0].usr_nombre;
                usuarioLogin = results[0].usr_login;
                res.render('index', { usuario : usuario, usuarioLogin: usuarioLogin});
            } else {
                res.render('login', { texto: "Usuario o contraseña incorrectos.", title: "Inicio sesión", usuarios: usuarioModel, usuario: usuario, usuarioLogin: usuarioLogin});
            }
        });
    });

    app.post('/procesarRegistro', function (req, res) {
        usuarioModel.setUser(req.body.nombreUsuario, req.body.clave, req.body.nombre, req.body.apellidos, req.body.mail, req.body.direccion, function () {
            res.render('exitoRegistro');
        });
    });

    app.post('/actualizarUsuario', function (req, res) {
        usuarioModel.changeUser(usuarioLogin, req.body.clave, req.body.nombre, req.body.apellidos, req.body.mail, req.body.direccion, function () {
            res.render('exitoRegistro');
        });
    });

    app.post('/procesarAltaArticulo', function (req, res) {
        articuloModel.setArticulo(req.body.eanArticulo, req.body.nombreArticulo, req.body.descripcion, req.body.pulgadas, req.body.procesador, req.body.resolucion, req.body.sistoper, req.body.conectividad, req.body.tipo, req.body.fabricante, req.body.imagen, req.body.precio, function () {
            res.render('exitoRegistro', { usuarioLogin : usuarioLogin });
        });
    });

    app.post('/actualizarArticulo', function (req, res) {
        articuloModel.changeArt(req.body.eanArticulo, req.body.nombreArticulo, req.body.descripcion, req.body.pulgadas, req.body.procesador, req.body.resolucion, req.body.sistoper, req.body.conectividad, req.body.tipo, req.body.fabricante, req.body.imagen, req.body.precio, function () {
            res.render('exitoRegistro');
        });
    });
};