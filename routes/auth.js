const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController')
const router = express.Router()

// route for sign up
router.post('/signup', registerUser)

// route for login
router.post('/login', loginUser)

module.exports = router