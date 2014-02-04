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
var articuloModel = {};
 
//obtenemos un articulo por su tipo
articuloModel.getTablets = function(pulgadas,callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM articulo WHERE art_tipo = \'tablet\' AND art_pantalla = ?', [pulgadas], function(error, row) {
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

//Búsqueda de artículos en general
articuloModel.getArticulos = function(cadena,callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM articulo WHERE art_nombre LIKE ? OR art_descrip LIKE ? OR art_procesador LIKE ? OR art_fabric LIKE ?',
            [cadena, cadena, cadena, cadena], function(error, row) {
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

//Búsqueda de artículos por nombre
articuloModel.getArticulosCatalogo = function(cadena,callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM articulo WHERE art_nombre = ?', [cadena], function (error, row) {
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