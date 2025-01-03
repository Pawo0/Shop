const express = require('express');
const router = express.Router();

const {
    getCart,
    getAllCarts,
    addProductToCart,
    removeProductFromCart,
    deleteCart,
    updateCart,
    addCart,
    checkoutCart
} = require('../controllers/cartController');

router.get('/', getAllCarts);
router.get('/user/:userId',getCart)
router.delete('/delete/:userId',deleteCart);
router.patch('/add', addProductToCart);
router.patch('/remove', removeProductFromCart);
router.put('/update/:userId', updateCart);
router.post('/add', addCart);
router.post('/checkout/:userId', checkoutCart);

module.exports = router;