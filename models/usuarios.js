//llamada al paquete mysql
var pg = require('pg'),
    conString = "postgres://iowvvikynknmfu:waBSsvgpeZ45Z2rdyrfJDZxClV@ec2-23-21-185-168.compute-1.amazonaws.com:5432/dpoake3pqalcl",
    client = new pg.Client(conString);
//Nos conectamos a la Base de Datos
client.connect();
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var usuarioModel = {};
 
//obtenemos un articulo por su tipo
usuarioModel.getPass = function(nombre, pass, callback)
{
    client.query('SELECT * FROM usuario WHERE usr_login = $1 AND usr_pass = $2 ', [nombre, pass], function(error, row) {
        if(error)
        {
            console.log(error);
        }
        else
        {   
            callback(null, row);
        }
    });
}

usuarioModel.setUser = function(login, pass, nombre, apell, mail, direccion, callback)
{
    
    client.query('INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6)', [login, pass, nombre, apell, mail, direccion], function(error, row) {
        if(error){
            console.log(error);
        } else {
            callback(null, row);
        }
    });
    
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = usuarioModel;