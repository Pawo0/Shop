const Cart = require('../models/cart')
const Product = require('../models/product')
const OrderHist = require('../models/orderHist')
const User = require('../models/user')

// todo dodany total do cart

const getCart = async (req, res) => {
    const {userId} = req.params
    const cart = await Cart.findOne({'user.userId': userId})
    if (!cart) {
        return res.status(404).json({message: 'Cart not found', success: false})
    }
    return res.status(200).json({cart, success: true})
}

const getAllCarts = async (req, res) => {
    const {limit = 10, page = 1} = req.query
    const carts = await Cart.find().limit(limit).skip(limit * (page - 1))
    return res.status(200).json({carts, success: true})
}

// przyjuje tez username bo jak nie ma cart to tworzony jest nowy
const addProductToCart = async (req, res) => {
    const {userId, username, productId, quantity} = req.body
    if (!userId || !productId || !quantity || !username) {
        return res.status(400).json({message: 'Please fill in all fields', success: false})
    }
    const product = await Product.findById(productId)
    if (!product) {
        return res.status(404).json({message: 'Product not found', success: false})
    }
    const cart = await Cart.findOne({'user.userId': userId})
    if (!cart) {
        const newCart = new Cart({
            user: {
                userId: userId,
                username: username
            },
            products: [{
                productId: productId,
                quantity: quantity,
            }],
            totalProducts: 1,
            totalQuantity: quantity,
            total: product.price * quantity
        })
        await newCart.save()
        return res.status(201).json({cart: newCart, success: true})
    }
    // jesli username jest podany to sprawdzamy czy sie zgadza z tym z cart, a jak nie podany to nie sprawdzamy i G
    if (username && cart.user.username !== username) {
        return res.status(400).json({message: `Cart does not belong to with username ${username}`, success: false})
    }

    const productIndex = cart.products.findIndex(el => (el.productId.toString() === productId))

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity
        cart.totalQuantity += quantity
        cart.total += product.price * quantity
    } else {
        cart.products.push({
            productId: productId,
            quantity: quantity,
        })
        cart.totalQuantity += quantity
        cart.totalProducts += 1
        cart.total += product.price
    }
    await cart.save()
    return res.status(200).json({cart, success: true})
}


const removeProductFromCart = async (req, res) => {
    const {userId, productId, quantity} = req.body
    if (!userId || !productId || !quantity) {
        return res.status(400).json({message: 'Please fill in all fields', success: false})
    }
    const product = await Product.findById(productId)
    if (!product) {
        return res.status(404).json({message: 'Product not found', success: false})
    }
    const cart = await Cart.findOne({'user.userId': userId})
    if (!cart) {
        return res.status(404).json({message: 'Cart not found', success: false})
    }
    const productIndex = cart.products.findIndex(el => (el.productId.toString() === productId))
    if (productIndex === -1) {
        return res.status(404).json({message: 'Product not found in cart', success: false})
    }
    if (cart.products[productIndex].quantity < quantity) {
        return res.status(400).json({message: 'Quantity exceeds available quantity', success: false})
    }
    cart.products[productIndex].quantity -= quantity
    cart.totalQuantity -= quantity
    cart.total -= product.price * quantity
    if (cart.products[productIndex].quantity === 0) {
        cart.products.splice(productIndex, 1)
        cart.totalProducts -= 1
    }
    await cart.save()
    return res.status(200).json({cart, success: true})
}

const updateCart = async (req, res) => {
    const {userId} = req.params
    const {products} = req.body
    const cart = await Cart.findOne({'user.userId': userId})
    if (!cart) {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({message: 'User not found', success: false})
        }
        const newCart = new Cart({
            user: {
                userId: userId,
                username: user.username
            },
            products: products,
            totalProducts: products.length,
            totalQuantity: products.reduce((acc, el) => acc + el.quantity, 0),
            total: products.reduce((acc, el) => acc + el.price * el.quantity, 0)
        })
        await newCart.save()
        return res.status(201).json({newCart, success: true})
    }
    cart.products = products
    cart.totalQuantity = products.reduce((acc, el) => acc + el.quantity, 0)
    cart.totalProducts = products.length
    cart.total = products.reduce((acc, el) => acc + el.price * el.quantity, 0)
    await cart.save()
    return res.status(200).json({cart, success: true})
}

const addCart = async (req,res) => {
    const {userId, username, products} = req.body
    const existingCart = await Cart.findOne({'user.userId': userId})
    if (existingCart) {
        return res.status(400).json({message: 'Cart already exists', success: false})
    }
    const newCart = new Cart({
        user: {
            userId: userId,
            username: username
        },
        products: products,
        totalProducts: products.length,
        totalQuantity: products.reduce((acc, el) => acc + el.quantity, 0),
        total: products.reduce((acc, el) => acc + el.price * el.quantity, 0)
    })
    await newCart.save()
    return res.status(201).json({newCart, success: true})
}

const deleteCart = async (req, res) => {
    const {userId} = req.params
    const deletedCart = await Cart.findOneAndDelete({'user.userId': userId})
    if (!deletedCart) {
        return res.status(404).json({message: 'Cart not found', success: false})
    }
    return res.status(200).json({deletedCart, success: true})
}

const checkoutCart = async (req, res) => {
    const {userId} = req.params;
    const cart = await Cart.findOne({'user.userId': userId});
    if (!cart) {
        return res.status(404).json({message: 'Cart not found', success: false});
    }

    const products = await Promise.all(cart.products.map(async el => {
        const product = await Product.findById(el.productId);
        return {
            productId: el.productId,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: el.quantity
        };
    }));
    const newOrderHist = new OrderHist({
        user: cart.user,
        products: products,
        discountedTotal: cart.discountedTotal,
        totalProducts: cart.totalProducts,
        totalQuantity: cart.totalQuantity,
        total: cart.total
    });

    await newOrderHist.save();
    await Cart.findOneAndDelete({'user.userId': userId});

    res.status(201).json({newOrderHist, success: true});
};



module.exports = {
    getCart,
    getAllCarts,
    addProductToCart,
    removeProductFromCart,
    deleteCart,
    updateCart,
    addCart,
    checkoutCart
}