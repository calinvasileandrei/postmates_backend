const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },

})

module.exports = mongoose.model('Product',ProductSchema);
