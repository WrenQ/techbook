//llamada al paquete mysql
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
var articuloModel = {};

function getArtTipo(tipo, tipoPropiedad, propiedad, callback) {
    client.query('SELECT * FROM articulo WHERE art_tipo = $1 AND art_' + tipoPropiedad + ' = $2', [tipo, propiedad], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
}

//obtenemos un articulo por su tipo
articuloModel.getTablets = function (pulgadas, callback) {
    getArtTipo('tablet', 'pantalla', pulgadas, callback);
};

articuloModel.getTVs = function (pulgadas, callback) {
    getArtTipo('smartTV', 'pantalla', pulgadas, callback);
};

articuloModel.getMoviles = function (so, callback) {
    getArtTipo('smartphone', 'sistoper', so, callback);
};


//Búsqueda de artículos en general
articuloModel.getArticulos = function (cadena, callback) {
    client.query('SELECT * FROM articulo WHERE art_nombre LIKE $1 OR art_descrip LIKE $2 OR art_procesador LIKE $3 OR art_fabric LIKE $4',
        [cadena, cadena, cadena, cadena], function (error, results) {
            if (error) {
                console.log(error);
            } else {
                callback(null, results.rows);
            }
        });
};


function getArticuloGeneral(tipoPropiedad, cadena, callback) {
    client.query('SELECT * FROM articulo WHERE art_' + tipoPropiedad + ' = $1', [cadena], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
}

//Búsqueda de artículos por nombre
articuloModel.getArticulosCatalogo = function (cadena, callback) {
    getArticuloGeneral('nombre', cadena, callback);
};

articuloModel.getArticuloByEan = function (cadena, callback) {
    getArticuloGeneral('ean', cadena, callback);
};

articuloModel.setArticulo = function (ean, nombre, descripcion, pulgadas, procesador, resolucion, sistoper, conectividad, tipo, fabricante, imagen, pvp, callback) {
    client.query('INSERT INTO articulo VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [ean, nombre, descripcion, pulgadas, procesador, resolucion, sistoper, conectividad, tipo, fabricante, imagen, pvp], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
};

articuloModel.changeArt = function (ean, nombre, descripcion, pulgadas, procesador, resolucion, sistoper, conectividad, tipo, fabricante, imagen, pvp, callback) {
    client.query('UPDATE articulo SET art_nombre = $1, art_descrip = $2, art_pantalla = $3, art_procesador = $4, art_resolucion = $5, art_sistoper = $6, art_conect = $7, art_tipo = $8, art_fabric = $9, art_imagen = $10, art_pvp = $11 WHERE art_ean = $12', [nombre, descripcion, pulgadas, procesador, resolucion, sistoper, conectividad, tipo, fabricante, imagen, pvp, ean], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = articuloModel;