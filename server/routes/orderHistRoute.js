const express = require('express');
const router = express.Router();

const {
    getUserOrderHist,
    getAllOrderHists,
    getOrderHist
} = require('../controllers/orderHistController');


router.get('/', getAllOrderHists);
router.get('/user/:userId', getUserOrderHist);
router.get('/:id', getOrderHist);

module.exports = router;