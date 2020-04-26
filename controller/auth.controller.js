var db = require('../db');
var md5 = require('md5'); 

module.exports.login = function(req, res) {
	res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({ email: email }).value();

	if (!user) {
		res.render('auth/login', {
			errors: [ "User does not exist" ]
		});
		return;
	}

	var hashedPassword = md5(password);

	console.log(hashedPassword);
	console.log(user.password);

	if (user.password !== hashedPassword) {
		res.render('auth/login', {
			errors: [ "Wrong password" ],
			info: req.body
		});
		return;
	}

	res.cookie("userId", user.id);

	res.redirect('/users');

};