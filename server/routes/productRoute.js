const express = require('express')
const router = express.Router()

const {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategoryList
} = require('../controllers/productController')


router.route('/').get(getProducts)
router.route('/categories').get(getCategoryList) // musi byc pierwsze bo inaczej nie dziala
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct)

module.exports = router