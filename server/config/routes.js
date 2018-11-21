var restaurant = require('../controllers/restaurants');
var review = require('../controllers/reviews');
var mongoose = require('mongoose')
var Restaurant = mongoose.model('Restaurant')
const path = require('path');


module.exports = function(app) {
    app.get('/api/restaurants', function(req,res) {
        restaurant.all_restaurants(req,res);
    }),
    app.get('/api/restaurants/:id', function(req,res) {
        restaurant.one_restaurant(req,res);
    }),
    app.post('/api/reviews/new/:restaurantId', function(req,res) {
        review.new(req,res);
    }),


    app.post('/api/restaurants', function(req,res) {
        restaurant.new(req,res);
    }),
    app.put('/api/restaurants/:id', (req,res) => {
        restaurant.update(req,res);
    }),
    app.delete('/api/restaurants/:id', (req,res) => {
        restaurant.remove(req,res);
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}