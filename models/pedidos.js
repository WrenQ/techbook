var pg = require('pg'),
    conString = "postgres://iowvvikynknmfu:waBSsvgpeZ45Z2rdyrfJDZxClV@ec2-23-21-185-168.compute-1.amazonaws.com:5432/dpoake3pqalcl",
    client = new pg.Client(conString);
//Nos conectamos a la Base de Datos
client.connect();
client.query('set schema \'techbook\'', function(err, rows) {
    if(err){
        console.log(err);
    }
});
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pedidoModel = {};
 
//creamos un pedido
pedidoModel.setPedido = function(loginUser, eanArticulo, cant, importe, fecha, callback)
{
    client.query('INSERT INTO pedido VALUES($1,$2,$3,$4,$5)', [loginUser, eanArticulo, cant, importe, fecha], function(error, results) {
        if(error){
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
}

//Obtenemos los pedidos de un usuario
pedidoModel.getPedidos = function(loginUser,callback)
{
    
    client.query('SELECT * FROM pedido WHERE ped_usuario = $1', [loginUser], function(error, results) {
        if(error)
        {
            console.log(error);
        }
        else
        {   
            callback(null, results.rows);
        }
    });
    
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = pedidoModel;