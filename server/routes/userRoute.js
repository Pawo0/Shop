const express = require("express")
const router = express.Router()

const {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    checkIfExist
} = require('../controllers/userController')

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/', getAllUsers)
router.route('/:id').get(getUserById).delete(deleteUser).patch(updateUser)
router.post('/check', checkIfExist)

module.exports = router