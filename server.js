// server.js

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();
app.use(serveStatic(path.join(__dirname, "/dist")))

var history = require('connect-history-api-fallback')
app.use(history())

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);
