var express = require('express');
var mongoose = require('mongoose');
var path = require('path')
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

require('./server/config/mongoose.js')
require('./server/models/restaurant.js')
require('./server/controllers/reviews.js')
require('./server/controllers/restaurants.js')
require('./server/config/routes.js')(app);

app.listen(8000, function () {
    console.log("listening on port 8000");
})