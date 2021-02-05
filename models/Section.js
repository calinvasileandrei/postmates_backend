const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    restaurants:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}
    ]
})

module.exports = mongoose.model('Section',SectionSchema);
