const express = require('express')
const router = express.Router()

const {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategoryList,
    getProductReviews
} = require('../controllers/productController')


router.route('/').get(getProducts)
router.route('/categories').get(getCategoryList) // musi byc pierwsze bo inaczej nie dziala
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct)
router.route('/:id/reviews/').get(getProductReviews)

module.exports = router