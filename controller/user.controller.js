var shortid = require('shortid');

var db = require('../db');

module.exports.index = function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res) { 
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	});

	res.render('users/index', {
		users: matchedUsers,

		inputValue: q
	});
};

module.exports.create = function(req, res) {
	res.render('users/create');
	console.log(req.cookies);
};

module.exports.get = function(req, res) {
	var id = req.params.id;

	var user = db.get('users').find({ id: id }).value();

	res.render('users/view', {
		user: user
	});
};

module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();

	console.log(res.locals);

	db.get('users').push(req.body).write();
	res.redirect('/users');
};

module.exports.cookie = function(req, res) {
	res.cookie('user-id', 12312);
	res.send('Hello');
};