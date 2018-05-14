var express = require('express')
var request = require('request')
var ejs = require('ejs')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)


http.listen(3000)

express.static('global')
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')


app.get('*', function (req, res) {
    res.render('index.ejs')
})

app.get('/overzicht', function (req, res) {
    res.render('overzicht.ejs')
})

io.on('connection', function(socket){
  socket.on('load data', function(){setInterval(function generate(){
    // Math.random() * (max - min) + min
    var data = {
      kamerTempSla: Math.floor(Math.random() * (20 - 7 + 1)) + 7,
      totalYieldSla: 243,
      totalYield4maandSla: 54,
      tankTempVis: Math.floor(Math.random() * (26 - 12 + 1)) + 12,
      pHTank: Math.floor(Math.random() * (10 - 3 + 1)) + 3,
      totalYieldKruiden: 270,
      totalYield4maandKruiden: 60
    }

    io.emit('loaded data', data)
  }, 10000)})
});
