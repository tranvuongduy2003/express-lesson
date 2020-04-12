var express = require('express');
var app = express();

var port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index', {
		name: 'ABC'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: [
			{ id: 1, name: 'Thinh' },
			{ id: 2, name: 'Nam' }
		]
	});
});

app.listen(port, function() {
 console.log('Sever listening on port ' + port);
});
