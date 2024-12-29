const Product = require('../models/product')
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
    const {limit = 15, page = 1, search, category} = req.query
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
    await Product.findOneAndDelete({_id: id})
    res.status(200).json({message: 'Product deleted'})
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategoryList
}