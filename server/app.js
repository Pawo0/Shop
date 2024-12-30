const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')

// app.use(express.urlencoded({extended: true}))

app.use(cors())

app.use(express.json())

const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewsRoute')

app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)

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