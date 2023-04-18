const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET = process.env.SECRET;

function generateAccessToken(id, username, role) {
    return jwt.sign( {id, username, role }, SECRET, { expiresIn: '36000s' } )
}

module.exports = { generateAccessToken }