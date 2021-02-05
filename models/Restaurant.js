const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    priceDelivery: {
        type: Number,
        required: true,
    },
    delivery: {
        type: String,
        required: true,
    },
    badge: {
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    position:{
        type:String,
        required: true
    },
    categories:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
    ]
})

module.exports = mongoose.model('Restaurant',RestaurantSchema);
