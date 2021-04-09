// server.js

var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()

var history = require('connect-history-api-fallback')
app.use(history())

var compression = require('compression')
app.use(compression())

// இது முக்கியமானது! உங்கள் கணினியில் உருவாக்கும் பொழுது இதை பயன்படுத்த கூடாது!
if (process.env.NODE_ENV === 'production') {
	// var secure = require('express-force-https')
	// app.use(secure())
}

app.use(serveStatic(path.join(__dirname, "/dist")))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

var port = process.env.PORT || 8080
app.listen(port)
