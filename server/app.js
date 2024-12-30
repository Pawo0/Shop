const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
require("express-async-errors")

const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')


app.use(cors())

app.use(express.json())

const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewRoute')
const userRouter = require('./routes/userRoute')

app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/users', userRouter)

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