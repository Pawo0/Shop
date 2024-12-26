const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000

const axios = require('axios');
const Product = require('../models/product');
const User = require('../models/user')

const start = async () => {
    try {
        const uri = process.env.MONGODB_URI || ""
        await mongoose.connect(uri)
        console.log("Connected to db...")
        app.listen(port, () => {
            console.log(`Listening on ${port}...`)
        })
    } catch (e) {
        console.log("Failed to connect to a database")
        console.error(e)
    }
    const products = await fetchProducts();
    if (products.length > 0) {
        await insertProductsToDatabase(products);
    } else {
        console.error('Brak danych do wstawienia');
    }
    await mongoose.connection.close();
}


const fetchProducts = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products?limit=1000');
        return response.data.products;
    } catch (error) {
        console.error('Błąd pobierania danych z API:', error.message);
        return [];
    }
};


const insertProductsToDatabase = async (products) => {
    try {
        const users = await User.find({})

        const formattedProducts = products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            images: product.images,
            reviews: product.reviews.map(review => {
                const randomUser = users[Math.floor(Math.random() * users.length)];
                return {
                    userId: randomUser._id,
                    rating: review.rating,
                    comment: review.comment,
                    date: review.date
                }
            }),
        }));


        await Product.insertMany(formattedProducts);
        console.log('Produkty zostały pomyślnie wstawione do bazy danych');
    } catch (error) {
        console.error('Błąd wstawiania danych do bazy:', error.message);
    }
};


start()