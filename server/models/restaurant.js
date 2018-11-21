var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    customer: { type: String, required: [true, "Name cannot be blank"], minlength: [3, "Customer name must be at least 3 characters"] },
    stars: { type: Number, required: [true, "Please select number of stars"] },
    review: { type: String, required: [true, "Review cannot be blank"], minlength: [3, "Review must continain at least 3 characters"] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

var RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name cannot be blank"], unique: [true, "Restaurant already exists"], minlength: [3, "Restaurant name must be at least 3 characters"] },
    cuisine: { type: String, required: [true, "Cuisine cannot be blank"], minlength: [3, "Cuisine type must be at least 3 characters in length."] },
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now},
    reviews: [ReviewSchema]
});

mongoose.model('Restaurant', RestaurantSchema);
mongoose.model('Review', ReviewSchema)