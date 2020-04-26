var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddlewares = require('./middlewares/auth.middlewares');


var port = 3000;

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index', {
		name: 'ABC'
	});
});

app.use('/users', authMiddlewares.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
 console.log('Sever listening on port ' + port);
});


