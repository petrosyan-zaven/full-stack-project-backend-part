const {authenticateToken} = require("../jwt/authenticate")

function products_route(app) {
    const products_controller = require('../controllers/products_contraller')
    
    app.get('/products', products_controller.allProducts);
    app.get('/products/:id', products_controller.singleProduct);
    app.post('/create_product', authenticateToken, products_controller.createProduct);
    app.put('/update_product/:id', authenticateToken, products_controller.updateProduct);
    app.delete('/delete_product/:id', authenticateToken, products_controller.deleteProduct);
}

module.exports = { products_route }