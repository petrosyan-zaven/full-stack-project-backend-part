const jwt = require('jsonwebtoken');
require('dotenv').config();

 const SECRET = process.env.SECRET;

 function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
   

    if ( token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, SECRET, ( err, user ) => {
        if (err) {
            return res.sendStatus(403)
        }
        console.log(user.role);

        if( user.role === 1 ) {
            next()
        }
    })
 }

 module.exports = { authenticateToken}

//  {
//     "image": "adminff",
//     "name": "pr3",
//     "price": "12",
//     "description": "text",
//     "quantity": "2"
// }

// create tables users and products .Create register and login, create functional JWT, create token verift token use midlewere, once admin can add and delete product and see all users bat all users can see products  use sqlit3, express js , crypto-js