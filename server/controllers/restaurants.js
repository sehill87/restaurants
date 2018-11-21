const mongoose = require('mongoose'),
    Restaurant = mongoose.model('Restaurant')
    // Review = mongoose.model('Review')

module.exports = {
    all_restaurants: function (req, res) {
        console.log("----")
        Restaurant.find({}, function (err, restaurants) {
            if (err) {
                console.log(err);
            } else {
                res.json(restaurants);
            }
        })
    },
    one_restaurant: function (req, res) {
        Restaurant.findOne({ _id: req.params.id }, function (err, name) {
            if (err) {
                console.log(err)
            } else {
                res.json(name)
            }
        })
    },
    new: function (req, res) {
        console.log('REQUEST', req.body.name)
        // var restaurant = new Restaurant({ name: req.body.name, cuisine: req.body.cuisine });
        // console.log(restaurant)
        // restaurant.save(function (err) {
        //     if (err) {
        //         console.log(err);
        //         res.json({ message: "Error!!!", errors: err})
        //     } else {
        //         res.json({ message: "Success!!!", restaurant: restaurant })
        //     }
        // })
        Restaurant.create(req.body, function (err, restaurant) {
            if (err) {
                console.log(err);
                res.json({ message: "Error!!!", errors: err})
            } else {
                res.json({ message: "Success!!!", restaurant: restaurant })
            }
        })
    },

    update: function(req, res) {
        var updates = {};
        if(req.body.name) {
            updates['name'] = req.body.name;
        }
        if(req.body.cuisine) {
            updates['cuisine'] =req.body.cuisine;
        }
        updates['updated_at'] = Date.now();
        console.log(updates)
        // Restaurant.update({ _id: req.params.id}, {$set: {name: updates['name'], cuisine: updates['cuisine'], updated_at: updates['updated_at']}}, {runValidators: true}, function(err, restaurant) {
        //     console.log(err)
        //     if (err) {
        //         console.log('something went wrong!')
        //         res.json({ message: "Error!!!", errors: err })
        //     } else {
        //         res.json({ message: 'Updates Complete!', restaurant: restaurant})
        //     }
        // })
        Restaurant.findOne({_id: req.params.id}, function(err, restaurant) {
            if (err) {
                console.log('something went wrong!')
                res.json({ message: "Error!!!", errors: err })
            } else {
                console.log(restaurant, "------");
                restaurant.name = req.body.name;
                restaurant.cuisine = req.body.cuisine;
                restaurant.updated_at = Date.now();
                restaurant.save( function(err, updatedRestaurant) {
                    if (err) {
                        console.log('something went wrong!')
                        res.json({ message: "Error!!!", errors: err })
                    } else {
                        res.json({ message: 'Updates Complete!', restaurant: updatedRestaurant})
                    }
                })
            }
        })
    },

    remove: function (req, res) {
        Restaurant.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                console.log('Error????');
                console.log(err);
            } else {
                res.json({ message: "Deleted!!!", _id: req.params.id})
                // res.redirect('/tasks');
            }
        })
    }
}

