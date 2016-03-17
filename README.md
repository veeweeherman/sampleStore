# sampleStore

# Employee Application/Code Challenge Directions
​
In this coding challenge, I'm requesting that you create and API server preferably using express 4, but you can also use other http server frameworks (or none at all). If you do please comment in the code explaining why you did this.
​
Below you will find a large JSON array of objects. These objects are small representations of items that people have listed for sale on Close5. With your API server, I would like you to use this static array as your database and created 1 or more http routes that return this data as JSON in various different ways. They include:
​
* The entire list sorted by creation date (Ascending and Descending)
* The entire listed sorted by the item’s price (Ascending and Descending)
* Any single item by its id
* An array of items based on any userId
* A route to request for items within 50 miles of their location coordinates
​
The file(s) should be bundled up into one node project so that I can just run `node app.js`. I should then be able to hit localhost:8080 which will give me some kind of guide as to how to navigate your API.
​
Feel free to ask any questions or for clarity on the challenge. You can email me the zip file or send me a github link to dylan@close5.com
​
Good luck!
​
Dylan
​
```javascript
[{
    "id" : "53fb8f26456e74467b000001",
    "loc" : [
        36.1665407118837763,
        -115.1408087193642729
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-25T19:31:50.180Z")
},
{
    "id" : "53fb8f81456e74467b000002",
    "loc" : [
        36.1632776369483580,
        -115.1409809579232757
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : "Cup",
    "price" : 20,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-25T19:33:21.153Z")
},
{
    "id" : "53fbb9b6456e74467b000004",
    "loc" : [
        36.1685268205825778,
        -115.1428359463777298
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-25T22:33:26.282Z")
},
{
    "id" : "53fbe21c456e74467b000006",
    "loc" : [
        36.1551724788769704,
        -115.1448416183734196
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : 20,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-26T01:25:48.754Z")
},
{
    "id" : "53fcc82a45b6f4db35000001",
    "loc" : [
        36.1685723269377419,
        -115.1440166218116872
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "tos",
    "createdAt" : ISODate("2014-08-26T17:47:22.885Z")
},
{
    "id" : "53fccf9945b6f4db3500000a",
    "loc" : [
        36.1644731140710007,
        -115.1408957812771092
    ],
    "userId" : "53fccf7545b6f4db35000007",
    "description" : "BBQ",
    "price" : 0,
    "status" : "tos",
    "createdAt" : ISODate("2014-08-26T18:19:05.321Z")
},
{
    "id" : "53fcf20e646d8f233e000006",
    "loc" : [
        36.1662231510807786,
        -115.1420746777390178
    ],
    "userId" : "53fccf7545b6f4db35000007",
    "description" : "How do we get on this?",
    "price" : 0,
    "status" : "tos",
    "createdAt" : ISODate("2014-08-26T20:46:06.044Z")
},
{
    "id" : "53fd1182646d8f233e000014",
    "loc" : [
        36.1644216946368360,
        -115.1395054988068409
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-26T23:00:18.800Z")
},
{
    "id" : "53fd1e48646d8f233e00001b",
    "loc" : [
        36.1655752469648633,
        -115.1420697964913131
    ],
    "userId" : "53fd1d5f646d8f233e000015",
    "description" : "Markers NOT previously chomped on.",
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-26T23:54:48.754Z")
},
{
    "id" : "53fe12ff56ef467e68000016",
    "loc" : [
        37.3765763684891184,
        -121.9235046521855423
    ],
    "userId" : "53fe114b56ef467e68000007",
    "description" : "Retro 3/4 motorcycle helmet\n\nSize small\nNever dropped\nSome scuffs\nLooks awesome... Vintage cool",
    "price" : 30,
    "status" : "tos",
    "createdAt" : ISODate("2014-08-27T17:18:55.068Z")
}]
