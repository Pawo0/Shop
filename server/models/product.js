const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    discountPercentage: {type: Number},
    rating: {type: Number, min: 0, max: 5},
    stock: {type: Number, required: true},
    brand: {type: String},
    category: {type: String},
    thumbnail: {type: String},
    images: [String],
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
    }],
}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema)