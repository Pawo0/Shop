const mongoose = require("mongoose")

const orderHistSchema = new mongoose.Schema({
    user:{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
        firstName: { type: String},
        lastName: { type: String },
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },

    }],
    total: { type: Number, required: true },
    discountedTotal: { type: Number },
    totalProducts: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('OrderHist', orderHistSchema);