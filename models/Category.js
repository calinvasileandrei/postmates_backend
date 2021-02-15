const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
    products: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
    ],
})

module.exports = mongoose.model('Category',CategorySchema);