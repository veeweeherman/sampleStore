'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Data = require('./dummyData/sampleData.js');
var _ = require('underscore');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
  console.log('are we there yet?');
  next();
})

router.get('/', function(req,res){
  res.json({ message: 'API is up and running, oi oi oi!!'})
});


router.route('/items')
  .get(function(req, res){

    // var foo = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}, {name: 'zed', age: 3}];
    // var baz = _.sortBy(foo, 'name');

    var things = Data.data;
    var sortedByISO = _.sortBy(things, 'createdAt');

      res.json(sortedByISO);

  })

app.use('/api', router);

  // lsof -i TCP:8080
  // kill 27165 <-- # is PID number








app.listen(port);
console.log('it\'s showtime!');
