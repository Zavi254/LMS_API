const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User registration
const registerUser = async (req, res) => {
    const { email, password, team } = req.body

    try {
        // check if user already exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create a new user
        user = new User({
            email,
            password: hashedPassword,
            team
        })

        await user.save()

        // Create and return JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(201).json({ token })


    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user by email
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(200).json({ token })


    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }

}

module.exports = { registerUser, loginUser }