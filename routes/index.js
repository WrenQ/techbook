/*
 * GET home page.
 */
//Obtencion del modelo 'articulosModel' para emplear sus metodos
var articuloModel = require('../models/articulos'), usuarioModel = require('../models/usuarios'), usuario;

//Ruteo de la aplicación
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {usuario: usuario});
    });

//mostrar tablets
    app.get('/tablets/:num', function (req, res) {
        var num = req.params.num;
        articuloModel.getTablets(num, function (err, results) {
            res.render('catalogo', { art: results, title: "Tablets", articulos: articuloModel, n: results.length });
        });
    });

    //mostrar smartphones
    app.get('/smartphones/:tipo', function (req, res) {
        var tipo = req.params.tipo;
        articuloModel.getMoviles(tipo, function (err, results) {
            res.render('catalogo', { art: results, title: "Smartphones " + tipo, articulos: articuloModel, n: results.length});
        });
    });

    //Mostrar página emergente con el detalle del artículo (ficha técnica)
    app.get('/catalogo/:modelo', function (req, res) {
        var modelo = req.params.modelo;
        articuloModelo.getArticulosCatalogo(modelo, function (err, results) {
            res.render('fichaTecnica', {art: results, articulos: articuloModel});
        });
    });

    app.get('/registro', function (req, res) {
        res.render('registro');
    });

    app.get('/:orden', function (req, res) {
        if (req.params.orden === 'logoff') {
            usuario = undefined;
            console.log('Me desconecto...');
            res.render('index', {usuario: usuario});
        }
    });

    app.post('/busqueda', function (req, res) {
        console.log(req.body.buscar);
        articuloModel.getArticulos(req.body.buscar, function (err, results) {
            res.render('catalogo', { art: results, title: "Resultados de la búsqueda", articulos: articuloModel, n: results.length});
        });
    });

    app.post('/', function (req, res) {
        usuarioModel.getPass(req.body.nUsuario, req.body.clave, function (err, results) {
            usuario = results[0].usr_nombre;
            if (results.length !== 0) {
                res.render('index', { usuario : usuario });
            } else {
                res.render('login', { texto: "Looser!", title: "Inicio sesión", usuarios: usuarioModel });
            }
        });
    });

    app.post('/procesarRegistro', function (req, res) {
    //Hay que controlar el caso en que ya haya un usuario con el mismo nombre de usuario o email
        usuarioModel.setUser(req.body.nombreUsuario, req.body.clave, req.body.nombre, req.body.apellidos, req.body.mail, req.body.direccion, function () {
            res.render('exitoRegistro');
        });
    });
};