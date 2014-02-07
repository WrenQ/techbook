/*
 * GET home page.
 */
//Obtencion del modelo 'articulosModel' para emplear sus metodos
var articuloModel = require('../models/articulos'), usuarioModel = require('../models/usuarios'), pedidoModel = require('../models/pedidos');
    //usuario = undefined, usuarioLogin = undefined;

//Ruteo de la aplicación
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {usuario: usuario});
    });

//mostrar tablets
    app.get('/tablets/:pulgadas', function (req, res) {
        var pulgadas = req.params.pulgadas;
        articuloModel.getTablets(pulgadas, function (err, results) {
            res.render('catalogo', { art: results, title: "Tablets " + pulgadas + "\"", articulos: articuloModel, n: results.length, user: req.user ? req.user : undefined });
        });
    });

    //mostrar smartphones
    app.get('/smartphones/:tipo', function (req, res) {
        var tipo = req.params.tipo;
        articuloModel.getMoviles(tipo, function (err, results) {
            res.render('catalogo', { art: results, title: "Smartphones " + tipo, articulos: articuloModel, n: results.length, user: req.user ? req.user : undefined });
        });
    });

    app.get('/smartTV/:pulgadas', function (req, res) {
        var pulgadas = req.params.pulgadas;
        articuloModel.getTVs(pulgadas, function (err, results) {
            res.render('catalogo', { art: results, title: "Smart TVs " + pulgadas + "\"", articulos: articuloModel, n: results.length, user: req.user ? req.user : undefined });
        });
    });

    //Mostrar página emergente con el detalle del artículo (ficha técnica)
    app.get('/catalogo/:modelo', function (req, res) {
        var modelo = req.params.modelo;
        articuloModel.getArticulosCatalogo(modelo, function (err, results) {
            res.render('fichaTecnica', {art: results[0], articulos: articuloModel, user: req.user ? req.user : undefined });
        });
    });

    app.get('/compra/:ean', function (req, res) {
        var ean = req.params.ean;
        var user= req.user ? req.user : undefined;
        pedidoModel.setPedido(user.login, ean, function () {
            res.render('exitoRegistro', { user: user} );
        });
    });

    app.get('/actualiza/:ean', function (req, res) {
        var ean = req.params.ean;
        articuloModel.getArticuloByEan(ean, function (err, results) {
            res.render('modArticulo', {art: results[0], user: req.user ? req.user : undefined });
        });
    });

    app.get('/registro', function (req, res) {
        res.render('registro');
    });

    app.get('/:orden', function (req, res) {
        var user= req.user ? req.user : undefined;
        if (req.params.orden === 'logoff') {
            console.log('Me desconecto...');
            res.render('index', {user: undefined });
        } else if (req.params.orden === "pedidos") {
            pedidoModel.getPedidos(user.login, function (err, results) {
                res.render('pedidosUsuario', { ped: results, title: "Pedidos de " + user.login, pedidos: pedidoModel, n: results.length, user: req.user ? req.user : undefined });
            });
        } else if (req.params.orden === "nuevoArticulo") {
            res.render('altaArticulo', {user: req.user ? req.user : undefined });
        } else if (req.params.orden === "cuenta") {
            usuarioModel.getUserData(user.login, function (err, results) {
                res.render('datosUsuario', {usr: results[0], user: req.user ? req.user : undefined });
            });
        }
    });

    app.post('/busqueda', function (req, res) {
        console.log(req.body.buscar);
        articuloModel.getArticulos(req.body.buscar, function (err, results) {
            res.render('catalogo', { art: results, title: "Resultados de la búsqueda", articulos: articuloModel, n: results.length, user: req.user ? req.user : undefined });
        });
    });

    app.post('/', function (req, res) {
        usuarioModel.getPass(req.body.nUsuario, req.body.clave, function (err, results) {
            if (results.length !== 0) {
                var user;
                user.nombre = results[0].usr_nombre;
                user.login = results[0].usr_login;
                user.apell = results[0].usr_apell;
                user.direccion = results[0].usr_direccion;
                user.email = results[0].usr_emal;
                user.pass = results[0].usr_pass;
                res.render('index', { user: user });
            } else {
                res.render('login', { texto: "Usuario o contraseña incorrectos.", title: "Inicio sesión", usuarios: usuarioModel , user: req.user ? req.user : undefined });
            }
        });
    });

    app.post('/procesarRegistro', function (req, res) {
        usuarioModel.setUser(req.body.nombreUsuario, req.body.clave, req.body.nombre, req.body.apellidos, req.body.mail, req.body.direccion, function () {
            res.render('exitoRegistro', {user: req.user ? req.user : undefined });
        });
    });

    app.post('/actualizarUsuario', function (req, res) {
        usuarioModel.changeUser(usuarioLogin, req.body.clave, req.body.nombre, req.body.apellidos, req.body.mail, req.body.direccion, function () {
            res.render('exitoRegistro', {user: req.user ? req.user : undefined });
        });
    });

    app.post('/procesarAltaArticulo', function (req, res) {
        articuloModel.setArticulo(req.body.eanArticulo, req.body.nombreArticulo, req.body.descripcion, req.body.pulgadas, req.body.procesador, req.body.resolucion, req.body.sistoper, req.body.conectividad, req.body.tipo, req.body.fabricante, req.body.imagen, req.body.precio, function () {
            res.render('exitoRegistro', { usuarioLogin : usuarioLogin, user: req.user ? req.user : undefined });
        });
    });

    app.post('/actualizarArticulo', function (req, res) {
        articuloModel.changeArt(req.body.eanArticulo, req.body.nombreArticulo, req.body.descripcion, req.body.pulgadas, req.body.procesador, req.body.resolucion, req.body.sistoper, req.body.conectividad, req.body.tipo, req.body.fabricante, req.body.imagen, req.body.precio, function () {
            res.render('exitoRegistro', {user: req.user ? req.user : undefined });
        });
    });
};