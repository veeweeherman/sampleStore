'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');

var Data = require('./dummyData/sampleData.js').data;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//////////////////////////////////////////////////////////////
// Initialize a router instance just for the use of our API. This will sit on top of the main app. Router can be instantiated many times for different sections of tha main app, but since we are only creating a few routes here that all have to do with one same small set of data I think it's fine to use this only once
var router = express.Router();


router.use(function(req, res, next){
    console.log('API is running! Please use responsibly');
    next();
  })

//////////////////////////////////////////////////////////
// ALL ROUTES

router.get('/', function(req,res){
  res.json('The API is up and running! Please use responsibly')
});



// SORT ITEMS BY DATE CREATED
router.route('/sortByCreationDateAsc')
  .get(function(req, res){
    var itemsSortedByCreationDateAsc = _.sortBy(Data, 'createdAt');
    res.json(itemsSortedByCreationDateAsc);
  })

router.route('/sortByCreationDateDesc')
  .get(function(req, res, next){

    // TODO: is there a better way to sort alphabetically backwards without having to use .reverse()? time complexity adds one more iteration with .reverse(), hmm...

    var itemsSortedByCreationDateAsc = _.sortBy(Data, 'createdAt');
    var itemsSortedByCreationDateDesc = itemsSortedByCreationDateAsc.reverse();
    res.json(itemsSortedByCreationDateDesc);

  })



// SORT ITEM BY PRICE
router.route('/price/Asc')
  .get(function(req, res){
    var priceAsc = _.sortBy(Data, 'price');
    res.json(priceAsc);
  })

router.route('/price/Desc')
  .get(function(req, res){
    var priceDesc = _.sortBy(Data, function(item){
      return item.price * -1;
    });
    res.json(priceDesc);
  })

// DISPLAY ALL ITEMS BY USER ID
router.route('/items/:userId')

  .get(function(req, res){
    var itemsByUserId = _.filter(Data, function(value, index, list){
      if (value.userId === req.params.userId){
        return value;
      }
    })
    if (itemsByUserId.length > 0){
        res.json(itemsByUserId);
    } else {
      res.json('sorry, no items from that user :( ')
    }
  })

// DISPLAY SINGLE ITEM BY ITS ID
router.route('/item/:id')
  .get(function(req, res){
    console.log('WTF!!!!!!!!!!!!!!!!', req.params.id);
    var itemById = _.find(Data, function(item){
      if (item.id === req.params.id){
        return item;
      }
    })
    if (!itemById){ res.json('sorry no items w that ID number')}
    else {

    res.json(itemById);
    }
  })


// DISPLAY ALL ITEMS WITHIN 50 MILES OF CURRENT LOCATION

// SOURCES for Haversine Formula: https://rosettacode.org/wiki/Haversine_formula#JavaScript
function haversine() {
  var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
  var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
  //  var R = 6372.8; // uncomment here if you want to search distance measured in kilometers
  var R = 3959; // use this if you want to search distance measured in miles
  var dLat = lat2 - lat1;
  var dLon = lon2 - lon1;
  var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
}

router.route('/items/:lat/:lon/:distance')
  .get(function(req, res) {
    // Because the sample data is only 10 objects clustered in one area, most input coordinates will return nothing if searching within 50 miles, so I've added a third parameter of distance that the user can input incase s/he wants to search for things within different distances
    // if you want to search for distance in kilometers, switch out the var R comment in the Haversine function above

    // The following converts all parameters to numbers because when taking from the route URL each param is a string
    req.params.lat = Number(req.params.lat);
    req.params.lon = Number(req.params.lon);
    req.params.distance = Number(req.params.distance);

    var within50miles = _.filter(Data, function(value, index, list){
      var distanceBetweenCurrentAndInput = haversine(req.params.lat, req.params.lon, value.loc[0], value.loc[1]);

      if (distanceBetweenCurrentAndInput <= req.params.distance){
        console.log('we have an item within ' + req.params.distance + ' miles!!!');
        return value;
      }
    })

    if (within50miles.length > 0){
      res.json(within50miles);
    } else {
      res.json('sorry no items within ' + req.params.distance + ' miles of your location :(')
    }
  });



app.use('/api',router);
app.use(express.static(path.join(__dirname, 'public')));

// SIMPLE ERROR HANDLING
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('IS THIS EVER INVOKED????????????????????????????????3333');
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
  });
}

var port = process.env.PORT || 8080;
///////////////////////////////////////////////////
// START SERVER
app.listen(port);
console.log('sampleStore app is running on localhost:' + port);
