const Reviews = require("../models/reviews");

const getAllReviews = async (req, res) => {
    const {limit = 10, page = 1} = req.query
    const reviews = await Reviews.find().limit(parseInt(limit)).skip((parseInt(page) - 1) * parseInt(limit))
    res.status(200).json({reviews})
}

const getReview = async (req, res) => {
    const {id} = req.params
    const review = await Reviews.findById(id)
    if (!review) {
        return res.status(404).json({message: "Review not found"})
    }
    res.status(200).json({review})
}

const getProductReviews = async (req, res) => {
    const {id} = req.params
    const reviews = await Reviews.find({productId: id})
    res.status(200).json({reviews})
}

const addReview = async (req, res) => {
    const {productId, rating, comment, user} = req.body
    if (!productId || !rating || !comment || !user) {
        return res.status(400).json({message: "Please fill in all fields", success: false})
    }
    const review = new Reviews({
        productId,
        user,
        rating,
        comment
    })
    await review.save()
    res.status(201).json({review,success: true})
}

const deleteReview = async (req, res) => {
    const {id} = req.params
    const deletedReview =  await Reviews.findByIdAndDelete(id)
    if (!deletedReview) {
        return res.status(404).json({message: "Review not found"})
    }
    res.status(200).json({deletedReview, success: true})
}

const editReview = async (req, res) => {
    const {id} = req.params
    const {rating, comment} = req.body
    const review = await Reviews.findByIdAndUpdate(id, {rating, comment}, {new: true})
    if (!review) {
        return res.status(404).json({message: "Review not found"})
    }
    res.status(200).json({review, success: true})
}

module.exports = {
    getAllReviews,
    getReview,
    getProductReviews,
    addReview,
    deleteReview,
    editReview
}