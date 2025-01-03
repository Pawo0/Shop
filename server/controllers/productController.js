const Product = require('../models/product')
const Reviews = require('../models/reviews')
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
    const {limit = 15, page = 1, search, category, lowStock, rating, minWeight, maxWeight} = req.query
    const query = {}
    if (search) {
        query.title = {
            $regex: search,
            $options: 'i'
        }
    }
    if (category && category !== 'all') {
        query.category = {
            $regex: "^" + category,
            $options: 'i'
        }
    }
    if (lowStock === 'true') {
        query.stock = {
            $lte: 5,
            $gt: 0
        }
    }
    if (rating) {
        query.rating = {
            $gte: parseFloat(rating)
        }
    }
    if (minWeight || maxWeight) {
        query.weight = {
            ...(minWeight && { $gte: parseFloat(minWeight) }),
            ...(maxWeight && { $lte: parseFloat(maxWeight) }),
        };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const products = await Product.find(query).skip(skip).limit(parseInt(limit))
    const totalProducts = await Product.countDocuments(query)
    res.json({products, totalProducts})
}

const getCategoryList = async (req, res) => {
    const categories = await Product.distinct('category')
    res.status(200).json({categories})
}


const getProductById = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Product not found'})
    }
    const product = await Product.findOne({_id: id})
    if (!product) {
        return res.status(404).json({message: 'Product not found'})
    }
    res.status(200).json({product})
}

const updateProduct = async (req, res) => {
    const {id} = req.params
    const product = await Product.findOneAndUpdate({_id: id}, req.body, {new: true})
    res.status(200).json(product)
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    const deletedProduct = await Product.findOneAndDelete({_id: id})
    res.status(200).json({message: 'Product deleted', product: deletedProduct})
}

const getProductReviews = async (req, res) => {
    const {id} = req.params
    const reviews = await Reviews.find({productId: id})
    res.status(200).json({reviews})
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategoryList,
    getProductReviews
}