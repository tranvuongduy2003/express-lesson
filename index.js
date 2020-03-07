var express = require('express');
var app = express();

var port = 3000;

app.get('/', function(request, response) {
	response.send('Hello Coders.Tokyo');
});

app.get('/users', function(request, response) {
	response.send('Users list');
});

app.listen(port, function() {
 console.log('Sever listening on port ' + port);
});
