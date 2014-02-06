var pg = require('pg'),
    conString = "postgres://iowvvikynknmfu:waBSsvgpeZ45Z2rdyrfJDZxClV@ec2-23-21-185-168.compute-1.amazonaws.com:5432/dpoake3pqalcl",
    client = new pg.Client(conString);
//Nos conectamos a la Base de Datos
client.connect();
client.query('set schema \'techbook\'', function (err, rows) {
    if (err) {
        console.log(err);
    }
});

//creamos un objeto para ir almacenando todo lo que necesitemos
var pedidoModel = {};

//creamos un pedido
pedidoModel.setPedido = function (loginUser, eanArticulo, pvp, callback) {
    client.query('INSERT INTO pedido VALUES($1,$2,$3)', [loginUser, eanArticulo, pvp], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
};

//Obtenemos los pedidos de un usuario
pedidoModel.getPedidos = function (loginUser, callback) {
    client.query('SELECT ped_codigo, art_nombre, ped_fecha, art_pvp FROM pedido, articulo WHERE ped_usuario = $1 AND ped_articulo = art_ean', [loginUser], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = pedidoModel;