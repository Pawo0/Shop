const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

const axios = require('axios');
const User = require('../models/user');
const Products = require('../models/product');
const Reviews = require('../models/reviews');

const start = async () => {
    try {
        const uri = process.env.MONGODB_URI || "";
        await mongoose.connect(uri);
        console.log("Connected to db...");
        app.listen(port, () => {
            console.log(`Listening on ${port}...`);
        });
    } catch (e) {
        console.log("Failed to connect to a database");
        console.error(e);
    }
    const products = await fetchProducts();
    if (products.length > 0) {
        await insertReviewsToDatabase(products);
    } else {
        console.error('Brak danych do wstawienia');
    }
    await mongoose.connection.close();
};

const fetchProducts = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products?limit=1000');
        return response.data.products;
    } catch (error) {
        console.error('Błąd pobierania danych z API:', error.message);
        return [];
    }
};

const insertReviewsToDatabase = async (products) => {
    try {
        const users = await User.find({});
        const reviews = [];

        for (const product of products) {
            const productInfo = await Products.findOne({ id: product.id });
            product.reviews.forEach(review => {
                const randomUser = users[Math.floor(Math.random() * users.length)];
                reviews.push({
                    productId: productInfo._id,
                    user: {
                        userId: randomUser._id,
                        username: randomUser.username,
                        firstName: randomUser.firstName,
                        lastName: randomUser.lastName,
                    },
                    rating: review.rating,
                    comment: review.comment,
                    date: review.date,
                });
            });
        }

        await Reviews.insertMany(reviews);
        console.log('Recenzje zostały pomyślnie wstawione do bazy danych');
    } catch (error) {
        console.error('Błąd wstawiania danych do bazy:', error.message);
    }
};

start();