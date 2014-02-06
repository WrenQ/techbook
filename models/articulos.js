//llamada al paquete mysql
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
var articuloModel = {};
 
//obtenemos un articulo por su tipo
articuloModel.getTablets = function(pulgadas,callback)
{

    client.query('SELECT * FROM articulo WHERE art_tipo = \'tablet\' AND art_pantalla = $1', [pulgadas], function(error, results) {
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

articuloModel.getTVs = function(pulgadas,callback)
{

    client.query('SELECT * FROM articulo WHERE art_tipo = \'smartTV\' AND art_pantalla = $1', [pulgadas], function(error, results) {
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

//Búsqueda de artículos en general
articuloModel.getArticulos = function(cadena,callback)
{
    client.query('SELECT * FROM articulo WHERE art_nombre LIKE $1 OR art_descrip LIKE $2 OR art_procesador LIKE $3 OR art_fabric LIKE $4',
        [cadena, cadena, cadena, cadena], function(error, results) {
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

//Búsqueda de artículos por nombre
articuloModel.getArticulosCatalogo = function(cadena,callback)
{
    
    client.query('SELECT * FROM articulo WHERE art_nombre = $1', [cadena], function (error, results) {
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
 
articuloModel.getMoviles = function(so,callback)
{
    client.query('SELECT * FROM articulo WHERE art_tipo = \'smartphone\' AND art_sistoper = $1', [so], function(error, results) {
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

articuloModel.getArticuloByEan = function(cadena, artic, callback)
{
    
    client.query('SELECT * FROM articulo WHERE art_ean = $1', [cadena], function (error, results) {
        if(error)
        {
            console.log(error);
        }
        else
        {   
            callback(null, artic, results.rows);
        }
    });

}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = articuloModel;