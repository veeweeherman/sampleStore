'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Data = require('./dummyData/sampleData.js').data;
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


// ALL ROUTES

// SORT ITEMS BY DATE CREATED
router.route('/sortByCreationDateAsc')
  .get(function(req, res){
    var itemsSortedByCreationDateAsc = _.sortBy(Data, 'createdAt');
    res.json(itemsSortedByCreationDateAsc);

  })

router.route('/sortByCreationDateDesc')
  .get(function(req, res){
    // var datesOnly = _.map(Data, function(value, index, list){
    //   return value.createdAt;
    // })
    // var datesOnlyDesc = datesOnly.reverse();
    // var stringDates = ["2014-08-25T19:33:21.153Z","2014-08-25T22:33:26.282Z","2014-08-26T01:25:48.754Z","2014-08-26T17:47:22.885Z","2014-08-26T18:19:05.321Z","2014-08-26T20:46:06.044Z","2014-08-26T23:00:18.800Z","2014-08-26T23:54:48.754Z","2014-08-27T17:18:55.068Z","2014-08-25T19:31:50.180Z"].sort().reverse();
    // is there a beter way to sort alphabetically backwards without having to use .reverse()? time complexity adds one more iteration with .reverse()

    var sortedByISO = _.sortBy(Data, 'createdAt');
    var sortedByISODesc = sortedByISO.reverse();
    res.json(sortedByISODesc);

  })

// SORT ITEM BY PRICE
router.route('/priceAsc')
  .get(function(req, res){
    var priceAsc = _.sortBy(Data, 'price');
    res.json(priceAsc);
  })

router.route('/priceDesc')
  .get(function(req, res){
    var priceDesc = _.sortBy(Data, function(item){
      return item.price * -1;
    });
    res.json(priceDesc);
  })

// DISPLAY ITEM BY USER ID

router.route('/items/:userId')
  .get(function(req, res){
    console.log('WTF!!!!!!!!!!!!!!!!', req.params.userId);
    // iterate thru list
    // if the item in the list passes the preicate, pass into the new array
    // return new array
    var itemsByUserId = _.filter(Data, function(value, index, list){
      if (value.userId === req.params.userId){
        return value;
      }
    })
    res.json(itemsByUserId);
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
    res.json(itemById);
  })


// FIND ITEMS WITHIN 50 MILES OF CURRENT LOCATION
// SOURCES for Haversine Formula:
  // https://rosettacode.org/wiki/Haversine_formula#JavaScript
function haversine() {
       var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
       var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
      //  var R = 6372.8; // km
      var R = 3959;
       var dLat = lat2 - lat1;
       var dLon = lon2 - lon1;
       var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
       var c = 2 * Math.asin(Math.sqrt(a));
       return R * c;
}

router.route('/items/:lat/:lon')
  .get(function(req, res) {
    var within50miles = _.filter(Data, function(value, index, list){
      var distanceBetweenCurrentAndInput = haversine(req.params.lat, req.params.lon, value.loc[0], value.loc[1]);

      if (distanceBetweenCurrentAndInput <= 50){
        console.log('we have an item within 50 miles!!!');
        return value;

      }
    })
    res.json(within50miles);
  });



app.use('/api', router);
app.use('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
})

  // lsof -i TCP:8080
  // kill 27165 <-- # is PID number

  // TODO:
    // organize routes into its own folder
    // test if sorted by iso date asc and desc is working by rearranging the sample data
    // set up index html instructions page

app.listen(port);
console.log('it\'s showtime!');


// TEST ROUTE
// router.route('/test')
//   .get(function(req, res){
//     var foo = [{name: 'moe', age: 10}, {name: 'larry', age: 50}, {name: 'curly', age: 6}, {name: 'zed', age: 1}];
//     // var baz = _.sortBy(foo, 'age');
//
//     //  works the same as:
//
//     // var baz = _.sortBy(foo, function(prop){
//     //   if (prop.age){
//     //     return prop.age;
//     //     // return prop.age * -1 //--> to return in descending order for numbers
//     //   }
//     // })
//
//     var baz = _.sortBy(foo, function(prop){
//       if (prop.name){
//         return prop.name;
//         // return prop.name.charCodeAt() * -1; //--> to return in descending alphabetical order
//       }
//     })
//
//     res.json(baz);
//
//   })
