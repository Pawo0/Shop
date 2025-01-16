require("dotenv").config()
const mongoose = require("mongoose")

const axios = require('axios');
const Products = require('../models/product');
const User = require('../models/user')
const Cart = require('../models/cart')

const start = async () => {
    try {
        const uri = process.env.MONGODB_URI || ""
        await mongoose.connect(uri)
        console.log("Connected to db...")
    } catch (e) {
        console.log("Failed to connect to a database")
        console.error(e)
    }
    const carts = await fetchCarts();
    if (carts.length > 0) {
        await insertCartsToDatabase(carts);
    } else {
        console.error('Brak danych do wstawienia');
    }
    await mongoose.connection.close();
}


const fetchCarts = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/carts?limit=1000');
        return response.data.carts;
    } catch (error) {
        console.error('Błąd pobierania danych z API:', error.message);
        return [];
    }
};


const insertCartsToDatabase = async (carts) => {
    try {
        const users = await User.find({})
        const products = await Products.find({});

        const productMap = new Map(products.map(product => [product.id, product]));

        const formattedCarts = carts.map((cart, index) => {
            if (index >= users.length) return null
            const currUser = users[index];
            return {
                user:{
                    userId: currUser._id,
                    username: currUser.username,
                    firstName: currUser.firstName,
                    lastName: currUser.lastName,
                },
                products: cart.products.map((product) => {
                    const currProduct = productMap.get(product.id)
                    return {
                        productId: currProduct._id,
                        quantity: product.quantity,
                    }
                })
                ,
                discountedTotal: cart.discountedTotal,
                totalProducts: cart.totalProducts,
                totalQuantity: cart.totalQuantity,
                total: cart.total
            }
        }).filter(cart => cart != null);


        await Cart.insertMany(formattedCarts);
        console.log('Produkty zostały pomyślnie wstawione do bazy danych');
    } catch (error) {
        console.error('Błąd wstawiania danych do bazy:', error.message);
    }
};


return start()