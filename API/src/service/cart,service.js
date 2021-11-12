const Cart = require('../model/cart.model');

getAllCart = async () => {
    return await Cart.find().then(carts => { return carts }).catch(err => { return err });
}

module.exports = {
    getAllCart,
}