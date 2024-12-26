const Product = require('../models/product')

const getProducts = async (req, res) => {
    const {limit, search, category} = req.query
    const query = {}
    if (search) {
        query.title = {
            $regex: search,
            $options: 'i'
        }
    }
    if (category) {
        query.category = category
    }
    const products = await Product.find(query).limit(parseInt(limit))
    res.json(products)
}

const getProductById = async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
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
    deleteProduct
}