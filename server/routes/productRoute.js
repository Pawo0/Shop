const express = require('express')
const router = express.Router()

const {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')


router.route('/').get(getProducts)
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct)

module.exports = router