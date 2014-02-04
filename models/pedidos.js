//llamada al paquete mysql
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        port: '3307', 
        password: '',
        database: 'techbook'
    }
);
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pedidoModel = {};
 
//obtenemos un articulo por su tipo
pedidoModel.setPedido = function(loginUser, eanArticulo, cant, importe, fecha, callback)
{
    if(connection){
        connection.query('INSERT INTO pedido VALUES(?,?,?,?,?)', [loginUser, eanArticulo, cant, importe, fecha], function(error, row) {
            if(error){
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}

//Búsqueda de artículos en general
articuloModel.getPedidos = function(loginUser,callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM pedido WHERE ped_usuario = ?', [loginUser], function(error, row) {
            if(error)
            {
                throw error;
            }
            else
            {   
                callback(null, row);
            }
        });
    }
}



 
articuloModel.getMoviles = function(so,callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM articulo WHERE art_tipo = \'smartphone\' AND art_sistOper = ?', [so], function(error, row) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = articuloModel;