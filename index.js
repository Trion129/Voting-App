var express = require("express");
var path = require('path');
var app = express();
var assert = require('assert');
var mongodb = require("mongodb");
app.set('view engine', 'pug');

var url = 'mongodb://localhost:27017/test';
var i,j;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
var find = function(criteria, db, callback) {
   var votes = [];
   if(criteria == {}){
     var cursor = db.collection("Votes").find().limit(15);
  }
  else{
     var cursor = db.collection("Votes").find(criteria);
  }

   cursor.each(function(err, doc) {
      if (doc != null) {
         votes.push(doc);
      } else {
         callback(votes);
      }
   });
};
var insert = function(criteria , db, callback) {
   db.collection('Votes').insertOne(criteria, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

app.get('/', function (req, res) {
  mongodb.MongoClient.connect(url, function(err,db){
    find({}, db, function(votes) {
      var votedata = [];
      for(i = 0;i < votes.length;i++){
        if(votedata[Math.floor(i / 3)]){
            votedata[Math.floor(i / 3)].push(votes[i]);
        }
        else {
          votedata.push([]);
          votedata[Math.floor(i / 3)].push(votes[i]);
        }
      }
      res.render('webpages/index', { title: 'Votesapp', votedata: JSON.stringify(votedata)});
      db.close();
    });
  });
});

app.get('/mypolls', function(req, res){
  var query = req.query.user;
  if(!query){
    res.end("Unspecified User");
    return;
  }
  mongodb.MongoClient.connect(url, function(err,db){
    find({user: query}, db, function(votes) {
      var votedata = [];
      for(i = 0;i < votes.length;i++){
        if(votedata[Math.floor(i / 3)]){
            votedata[Math.floor(i / 3)].push(votes[i]);
        }
        else {
          votedata.push([]);
          votedata[Math.floor(i / 3)].push(votes[i]);
        }
      }
      res.render('webpages/mypolls', { title: "My Polls", votedata: JSON.stringify(votedata)});
      db.close();
    });
  });
});

app.get('/newpoll', function(req,res){
  res.render('webpages/createPoll', {title: "New Poll"});
});

app.post('/api/addpoll', function(req,res){
  var criteria={
    title : req.body.title,
    description : req.body.description,
    user : req.body.user,
    options : req.body.options
  };
  res.end(criteria);
  /*MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insert(criteria,db, function(result) {
        res.redirect('/viewpoll/' + result._id);
        db.close();
    });
  });*/
})

app.get('/viewpoll/:param', function(req,res){
  //TODO
  res.render('webpages/viewpoll', {title: "Poll View", data: JSON.stringify(votedata[0][0])});
})

app.listen(process.env.PORT || 8080);
