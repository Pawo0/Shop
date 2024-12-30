const express = require("express")
const router = express.Router()

const {
    getAllReviews,
    getReview,
    getProductReviews,
    addReview,
    deleteReview,
    editReview
} = require('../controllers/reviewsController')

router.get('/', getAllReviews)
router.get('/product/:id', getProductReviews)
router.post('/add', addReview)
router.route('/:id')
    .get(getReview)
    .delete(deleteReview)
    .patch(editReview)

module.exports = router