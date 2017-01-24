var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var http = require('http');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/dictionary', function(req, res){
  var path = '/api/v1/references/scrabble/' + req.body.word + '?key=4.391078540068126e29';
  console.log('path', path)

  var callback = function(response){
    console.log('in callback response:', response.responseText)
    // res.send(response)
  }

  var options = {
    hostname: 'www.wordgamedictionary.com', 
    path: path,
  }

  http
    .get(options, callback)
    .end()
});

app.use(express.static(path.join(__dirname + '/client/build')));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Word game app listening at http://%s:%s', host, port);
});

