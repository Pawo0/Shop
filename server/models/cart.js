const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user:{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        username: { type: String, required: true },
        firstName: { type: String},
        lastName: { type: String },
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
    }],
    discountedTotal: { type: Number },
    totalProducts: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
