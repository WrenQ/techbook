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
var usuarioModel = {};
 
//obtenemos un articulo por su tipo
usuarioModel.getPass = function(nombre, pass, callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM usuario WHERE usr_login = ? AND usr_pass = ? ', [nombre, pass], function(error, row) {
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

usuarioModel.setUser = function(login, pass, nombre, apell, mail, direccion, callback)
{
    if(connection){
        connection.query('INSERT INTO usuario VALUES(?,?,?,?,?,?)', [login, pass, nombre, apell, mail, direccion], function(error, row) {
            if(error){
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = usuarioModel;