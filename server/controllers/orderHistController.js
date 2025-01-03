const OrderHist = require('../models/orderHist')

const getUserOrderHist = async (req, res) => {
    const {userId} = req.params
    const {limit = 10, page = 1} = req.query
    const orderHist = await OrderHist.find({'user.userId': userId}).limit(parseInt(limit)).skip((parseInt(page) - 1) * parseInt(limit))
    if (!orderHist) {
        return res.status(404).json({message: 'Order history not found', success: false})
    }
    return res.status(200).json({orderHist, success: true})
}

const getAllOrderHists = async (req, res) => {
    const {limit = 10, page = 1} = req.query
    const orderHists = await OrderHist.find().limit(parseInt(limit)).skip((parseInt(page) - 1) * parseInt(limit))
    return res.status(200).json({orderHists, success: true})
}

const getOrderHist = async (req, res) => {
    const {id} = req.params
    const orderHist = await OrderHist.findById(id)
    if (!orderHist) {
        return res.status(404).json({message: 'Order history not found', success: false})
    }
    return res.status(200).json({orderHist, success: true})
}

module.exports = {
    getUserOrderHist,
    getAllOrderHists,
    getOrderHist
}