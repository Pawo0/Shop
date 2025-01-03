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
    const {username, email, password, role} = req.body
    if (!username || !email || !password) {
        return res.status(400).json({message: 'Username, email and password are required', success: false})
    }
    if (role && role !== 'user' && role !== 'admin') {
        return res.status(400).json({message: 'Invalid role', success: false})
    }
    const existingUser = await User.find({$or: [{username}, {email}]})
    if (existingUser.length) {
        return res.status(400).json({message: 'User with this username or email already exists', success: false})
    }
    const user = await User.create({username, email, password, role})
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

const deleteUser = async (req, res) => {
    const {id} = req.params
    const user = await User.findOneAndDelete({_id: id})
    if (user) {
        res.status(200).json({message: 'User deleted', success: true, user})
    } else {
        res.status(404).json({message: 'User not found', success: false})
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {
        username,
        email,
        password,
        role,
        firstName,
        lastName,
        address,
        phone
    } = req.body // interface User
    if (role && role !== 'user' && role !== 'admin') {
        return res.status(400).json({message: 'Invalid role', success: false})
    }
    const user = await User.findByIdAndUpdate(id, req.body, {new: true})
    if (user) {
        res.status(200).json({user, message: "User updated", success: true})
    } else {
        res.status(404).json({message: 'User not found', success: false})
    }
}

const checkIfExist = async (req, res) => {
    const {username, email} = req.body
    const users = await User.find({$or: [{username}, {email}]})
    let usernameExist = false
    let emailExist = false
    if (users.length) {
        for (let user of users) {
            if (user.username === username) {
                usernameExist = true
            }
            if (user.email === email) {
                emailExist = true
            }
        }

    }
    return res.status(200).json({success: true,usernameExist, emailExist})
}

const checkPassword = async (req, res) => {
    const {userId, password} = req.body
    const user = await User.findById(userId)
    if (user.password === password) {
        return res.status(200).json({success: true})
    } else {
        return res.status(400).json({success: false})
    }
}

module.exports = {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    checkIfExist,
    checkPassword
}