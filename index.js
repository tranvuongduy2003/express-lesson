var express = require('express');
var shortid = require('shortid');
var app = express();

var port = 3000;

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({ users: [] })
  .write();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index', {
		name: 'ABC'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
});


app.get('/users/search', function(req, res) { 
	var q = req.query.q;
	var matchedUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	});

	res.render('users/index', {
		users: matchedUsers,

		inputValue: q
	});
});


app.get('/users/create', function(req, res) {
	res.render('users/create');
});

app.post('/users/create', function(req, res) {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
});

app.get('/users/:id', function(req, res) {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();



	res.render('users/view', {
		user: user
	});
});

app.listen(port, function() {
 console.log('Sever listening on port ' + port);
});


