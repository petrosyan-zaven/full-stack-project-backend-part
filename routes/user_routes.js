const { authenticateToken } = require("../jwt/authenticate")
const { userAuthenticateToken} = require("../jwt/userAuthenticate");
   

function user_route(app) {
    const user_controller = require('../controllers/user_controller');
    const users_list = require('../controllers/users_list');

    app.get('/userslist', authenticateToken, users_list.allUsersList)
    app.post('/register', user_controller.register);
    app.post('/login', user_controller.login);
    app.put('/updateuser/:id', userAuthenticateToken, users_list.updateUser);
    app.delete('/deleteuser/:id', userAuthenticateToken, users_list.deleteUser);
}

module.exports = { user_route }