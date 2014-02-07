
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');

var app = express();

var flash = require('connect-flash');
var users = require('./routes/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var seqConnectParams = require('./sequelize-params');
var usuarioModel = require('./models-sequelize/usuarios');

passport.serializeUser(users.serialize);
passport.deserializeUser(users.deserialize);
passport.use(users.strategy);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({secret: 'keyboard cat'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

seqConnectParams.connect();
seqConnectParams.query('set schema \'techbook\'', function (err, rows) {
    if (err) {
        console.log(err);
    }
});

users.configure({
	users: usuarioModel,
	passport: passport
});

app.get('/', routes.index);
//app.get('/altaArticulo', users.endureAuthenticated, notes.add);
//app.get('/login', users.doLogin);
app.post('/login', passport.authenticate('local', {
	failureRedirect: '/login', failureFlash: true
}), users.postLogin);
app.get('/logoff', users.doLogout);


// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});