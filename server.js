// server.js

var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express();

var history = require('connect-history-api-fallback')
app.use(history())

var compression = require('compression');
app.use(compression());

function requireHTTPS(req, res, next) {
	// The 'x-forwarded-proto' check is for Heroku
	if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
		return res.redirect('https://' + req.get('host') + req.url);
	}
	next();
}
app.use(requireHTTPS());

app.use(serveStatic(path.join(__dirname, "/dist")))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

var port = process.env.PORT || 8080
app.listen(port)