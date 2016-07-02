var express = require("express");
var path = require('path');
var app = express();

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('webpages/index', { title: 'Votesapp', message: 'Hello there!'});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8080);
