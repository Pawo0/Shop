const jwt = require('jsonwebtoken')

function generateToken(user) {
    return jwt.sign({userId: user._id, username: user.username, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: '2m'
    })
}

function generateRefreshToken(user){
    return jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = {generateToken, generateRefreshToken}