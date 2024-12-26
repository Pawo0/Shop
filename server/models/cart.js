const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        discountPercentage: { type: Number },
    }],
    total: { type: Number, required: true },
    discountedTotal: { type: Number, required: true },
    totalProducts: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);