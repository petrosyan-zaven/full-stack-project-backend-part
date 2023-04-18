const jwt = require('jsonwebtoken');
require('dotenv').config();

 const SECRET = process.env.SECRET;

 function userAuthenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if ( token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, SECRET, ( err, user ) => {
        if (err) {
            return res.sendStatus(403)
        }
        console.log(user.role, token);

        if( user.role === 1  || user.id == req.params.id ) {
            next()
        }
    })
 }

 module.exports = { userAuthenticateToken }