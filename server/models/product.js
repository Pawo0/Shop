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
    dimensions: {
        width: {type: Number},
        height: {type: Number},
        depth: {type: Number}
    },
    availabilityStatus: {type: String},
    weight: {type: Number},
    returnPolicy: {type: String},
    shippingInformation: {type: String}
}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema)