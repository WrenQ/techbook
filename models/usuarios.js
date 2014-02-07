//llamada al paquete mysql
var pg = require('pg'),
    conString = "postgres://iowvvikynknmfu:waBSsvgpeZ45Z2rdyrfJDZxClV@ec2-23-21-185-168.compute-1.amazonaws.com:5432/dpoake3pqalcl",
    client = new pg.Client(conString);
//Nos conectamos a la Base de Datos
client.connect();
client.query('set schema \'techbook\'', function (err) {
    if (err) {
        console.log(err);
    }
});
//creamos un objeto para ir almacenando todo lo que necesitemos
var usuarioModel = {};


usuarioModel.getPass = function (nombre, pass, callback) {
    client.query('SELECT * FROM usuario WHERE usr_login = $1 AND usr_pass = $2 ', [nombre, pass], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

usuarioModel.getUserData = function (login, callback) {
    client.query('SELECT * FROM usuario WHERE usr_login = $1 ', [login], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

usuarioModel.setUser = function (login, pass, nombre, apell, mail, direccion, callback) {
    client.query('INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6)', [login, pass, nombre, apell, mail, direccion], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
};

usuarioModel.changeUser = function (login, pass, nombre, apell, mail, direccion, callback) {
    client.query('UPDATE usuario SET usr_pass = $1, usr_nombre = $2, usr_apell = $3, usr_emal = $4, usr_direccion = $5 WHERE usr_login = $6', [pass, nombre, apell, mail, direccion, login], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            callback(null, results.rows);
        }
    });
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = usuarioModel;