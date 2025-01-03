const express = require("express")
const router = express.Router()

const {
    loginUser,
    registerUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    checkIfExist,
    checkPassword
} = require('../controllers/userController')

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/', getAllUsers)
router.route('/:id').get(getUserById).delete(deleteUser).patch(updateUser)
router.post('/check', checkIfExist)
router.post('/checkpassword', checkPassword)

module.exports = router