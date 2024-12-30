const express = require("express")
const router = express.Router()

const {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById
} = require('../controllers/userController')

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)

module.exports = router