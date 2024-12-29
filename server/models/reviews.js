const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    user: {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        username: {type: String, required: true},
        firstName: {type: String},
        lastName: {type: String},
    },
    rating: {type: Number, min: 1, max: 5, required: true},
    comment: {type: String},
    date: {type: Date, default: Date.now},


}, {timestamps: true})

module.exports = mongoose.model('Review', reviewSchema)