var LocalStrategy = require('passport-local').Strategy;
var users = undefined;
var passport = undefined;
exports.configure = function(params) {
	users = params.users;
	passport = params.passport;
}

module.exports.serialize = function(user, done) {
	done(null, user.id);
}
module.exports.deserialize = function(id, done) {
	users.findById(id, function (err, user) {
		done(err, user);
	});
}

module.exports.strategy = new LocalStrategy(function(username, password, done) {
	process.nextTick(function () {
		users.findByUsername(username, function(err, user) {
			if(err) { return done(err); }
			if(!user) { return done(null, false, {
				message: 'Unknown user ' + username }); }
			if(user.password !== password) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			return done(null, user);
		});
	});
});

module.exports.ensureAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/login');
}

/*module.exports.doLogin = function(req, res) {
	res.render('login', {
		title: 'Inicio de sesión',
		user: req.user,
		message: req.flash('error')
	});
}*/

module.exports.postLogin = function(req, res) {
	res.redirect('/');
}

module.exports.doLogout = function(req, res) {
	req.logout();
	res.redirect('/');
}