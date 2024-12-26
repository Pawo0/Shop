const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')

const Product = require('./models/product')

app.use(cors())

app.get("/products", async (req, res) =>{
    const products = await Product.find({})
    res.status(200).json(products.slice(0,10))
})

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
}


start()