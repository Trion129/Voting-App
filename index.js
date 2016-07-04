var express = require("express");
var path = require('path');
var app = express();

app.set('view engine', 'pug');

var votedata=[
  [
    {
      link: "#",
      head: "Kejriwal vs Modi",
      description: "Who would win the polls?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    }
  ],
  [
    {
      link: "#",
      head: "Kejriwal vs Modi",
      description: "Who would win the polls?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    }
  ]
];

app.get('/', function (req, res) {
  res.render('webpages/index', { title: 'Votesapp', votedata: JSON.stringify(votedata)});
});

app.get('/mypolls', function(req, res){
  res.render('webpages/mypolls', { title: "My Polls", votedata: JSON.stringify(votedata)});
});

app.get('/newpoll', function(req,res){
  res.render('webpages/createPoll', {title: "New Poll"});
});

app.post('/api/addpoll', function(req,res){
  //TODO Add data
  id = 0;
  res.redirect('/showpoll/' + id);
})

app.get('/showpoll/:param', function(req,res){
  //TODO
  res.render('webpages/createPoll', {title: "Poll View", data: });
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8080);
