const User = require('../models/user')
const generateToken = require('../utils/generateToken')

const loginUser = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        res.status(400).json({message: 'Username and password are required', success: false})
    }
    // w przyszlosci mozna zaszyfrowac haslo i zrobic porownanie z zaszyfrowanym haslem
    const user = await User.findOne({username, password})
    if (user) {
        const token = generateToken(user)
        res.status(200).json({token, success: true})
    } else {
        res.status(401).json({message: 'Invalid username or password', success: false})
    }
}

const registerUser = async (req, res) => {
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        return res.status(400).json({message: 'Username, email and password are required', success: false})
    }
    const existingUser = await User.find({$or: [{username}, {email}]})
    if (existingUser) {
        return res.status(400).json({message: 'User with this username or email already exists', success: false})
    }
    const user = await User.create({username, email, password})
    const token = generateToken(user)
    res.status(201).json({user, token, success: true})
}

const getAllUsers = async (req, res) => {
    const users = await User.find({})

    res.status(200).json({users, success: true})
}

const getUserById = async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id)
    if (user) {
        res.status(200).json({user, success: true})
    } else {
        res.status(404).json({message: 'User not found', success: false})
    }
}

module.exports = {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById
}