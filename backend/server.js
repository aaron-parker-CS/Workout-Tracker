require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')

// Initizlize express app
const app = express()

// Middleware
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// Routes
app.use('/api/workouts/', workoutsRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Server connected to DB')
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



