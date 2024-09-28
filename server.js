const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bookingRoutes = require('./routes/bookingRoutes')
// const auth = require('./middleware/authMiddleware')

dotenv.config()

const authRoutes = require('./routes/auth')

const app = express()
app.use(cors())


// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error', err))

app.use(express.json())

// Auth routes
app.use('/api/auth', authRoutes)
app.use('/api/leaves', bookingRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})