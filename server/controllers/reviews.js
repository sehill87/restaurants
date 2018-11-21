const mongoose = require('mongoose')
const Restaurant = mongoose.model('Restaurant')
const Review = mongoose.model('Review')

module.exports = {
    new: function (req, res) {
        console.log('REQUEST', req.body.customer)
        var review = new Review({ customer: req.body.customer, stars: req.body.stars, review: req.body.review });
        console.log(review)
        review.save(function (err) {
            if (err) {
                console.log(err);
                res.json({ message: "Error!!!", errors: err })
            } else {
                Restaurant.findOneAndUpdate({ _id: req.params.restaurantId }, { $push: { reviews: review } }, { runValidators: true }, function (err, restaurant) {
                    if (err) {
                        // handle the error from trying to update the user
                        res.json({ message: "Error!!!", errors: err });
                    } else {
                        // it worked! How shall we celebrate?
                        res.json(restaurant);
                    }
                })
            }
        })
    }
    
}