var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var assert = require('assert');
var mongodb = require("mongodb");
var shortid = require("shortid");

var app = express();

app.set('view engine', 'pug');

var url = 'mongodb://trion:paintball@ds017432.mlab.com:17432/mymongo',i,j;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));


var find = function(criteria, db, callback) {
   var votes = [];
   if(criteria == {}){
     var cursor = db.collection("Votes").find().limit(15);
  }
  else{
     var cursor = db.collection("Votes").find(criteria).limit(15);
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
var update = function(criteria,updater,db, callback) {
   db.collection('Votes').updateOne(
      criteria,
      updater,
      function(err, results) {
        callback();
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

app.get('/viewpoll/:param', function(req,res){
  var query = req.params.param;
  mongodb.MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    find({_id: query}, db, function(vote) {
      var votedata = vote[0];
      res.render('webpages/viewPoll', {title: "Poll View",id: votedata._id, data: JSON.stringify(votedata)});
      db.close();
    });
  });
});

app.post('/api/addpoll', function(req,res){
  var votes = req.body.options.split(/\r\n/);
  var options = [];
  for(i = 0; i < votes.length; i++){
    options.push([votes[i],0]);
  }
  var id = shortid.generate();
  var criteria={
    _id : id,
    head : req.body.title,
    description : req.body.description,
    user : req.body.user,
    options : options
  };
  mongodb.MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insert(criteria,db, function(result) {
        res.redirect('/viewpoll/' + id);
        db.close();
    });
  });
})

app.post('/api/vote/:param', function(req,res){
  var option = req.body.option;
  var query = req.params.param;
  var criteria={
    _id : query
  };
  var updater;
  if(option == "add"){
    if(req.body.addoption == ""){
      res.redirect('/viewpoll/' + query);
      return;
    }
    updater = {
      $push: {
        "options": [req.body.addoption, 1 ]
      }
    }
  }
  else{
    var index = req.body.option;
    updater = {
      $inc: {

      }
    }
    var temp = 'options.'+index+'.1';
    updater.$inc[temp] = 1;
  }
  mongodb.MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    update(criteria, updater , db, function(result) {
        res.redirect('/viewpoll/' + query);
        db.close();
    });
  });
})

app.listen(process.env.PORT || 8080);
