var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var User = undefined;
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname, params.username, params.password, params.params);
    User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true, unique: true
        },
        login: { type: Sequelize.STRING, unique: true },
        nombre: Sequelize.STRING,
        apell: Sequelize.STRING,
        pass: Sequelize.STRING,
        email: Sequelize.STRING,
        direccion: Sequelize.STRING
    });
    User.sync().success(function() {
        callback();
    }).error(function(err) {
        callback(err);
    })
}

exports.disconnect = function(callback) {
    callback();
}