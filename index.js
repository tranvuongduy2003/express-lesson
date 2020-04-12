var express = require('express');
var app = express();

var port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

var users = [
	{ id: 1, name: 'Thinh' },
	{ id: 2, name: 'Nam' }
]

app.get('/', function(req, res) {
	res.render('index', {
		name: 'ABC'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: users
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


app.listen(port, function() {
 console.log('Sever listening on port ' + port);
});
