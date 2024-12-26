const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000

const axios = require('axios');
const User = require('../models/user');


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
    const users = await fetchUsers();
    console.log(users)
    if (users.length > 0) {
        await insertUsersToDatabase(users);
    } else {
        console.error('Brak danych do wstawienia');
    }
    await mongoose.connection.close();
}



const fetchUsers = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/users');
        return response.data;
    } catch (error) {
        console.error('Błąd pobierania danych z API:', error.message);
        return [];
    }
};


const insertUsersToDatabase = async (users) => {
    try {
        const formattedUsers = users.map(user => ({
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.name.firstName,
            lastName: user.name.lastName,
            address: {
                street: user.address.street,
                city: user.address.city,
            },
            phone: user.phone,
        }));


        await User.insertMany(formattedUsers);
        console.log('Produkty zostały pomyślnie wstawione do bazy danych');
    } catch (error) {
        console.error('Błąd wstawiania danych do bazy:', error.message);
    }
};


start()