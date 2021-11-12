
const Cart = require('../model/cart.model');
const CartService = require('../service/cart,service');
const ProductService = require('../service/product.service');
const mongoose = require('mongoose');
const helper = require('../helper/service.helper');


getAllCart = async (req, res) => {
    const result = await CartService.getAllCart();
    return res.send(result);
}

getCart = (req, res) => {
    const { userId } = req.params;

    if (!userId) return helper.requireField(res, 'User Id');

    Cart.findOne({ createBy: userId }, { createBy: 0 }).then(carts => {
        if (carts) {
            const productIds = [];
            let total = 0;
            carts.products.map(cart => {
                cart.toObject();
                productIds.push(mongoose.Types.ObjectId(cart.productId));
                total = total + cart.count;
            });
            ProductService.getProductById(productIds, products => {
                let list = carts.products.map(cart => cart.toObject());
                list = list.filter(s => !s.count == 0).map(s => ({ ...s, product: products.find(x => x.id == s.productId) }));

                const result = {
                    id: carts.id,
                    result: list,
                    total: total
                }

                res.send(result)
            });

        } else {
            res.send([]);
        }
    }).catch(err => res.send(err));
}

addCart = (req, res) => {
    const { userId, productId, id } = req.body;

    if (!userId) return helper.requireField(res, 'User Id');

    Cart.findOne({ createBy: userId }, (err, cart) => {
        if (err) throw err;
        if (cart == null) { // Add new 
            let newCart = new Cart();
            newCart.createBy = userId;
            newCart.createAt = new Date();
            newCart.products.push({ productId: productId, count: 1 });
            newCart.save()
                .then(result => res.send(result))
                .catch(err => res.send(err));
        } else { // Update
            const existProduct = cart.products.map(s => s.toObject()).find(s => s.productId === productId);
            if (existProduct) { // update exist product
                Cart.update({ 'products._id': existProduct._id },
                    {
                        '$set': {
                            'products.$.count': existProduct.count + 1,
                        }
                    }
                    , (err, Updated) => {
                        if (err) throw err;
                        return res.send({ success: Updated.ok === 1 });
                    })
            } else { // add new product
                if (!productId) return helper.requireField(res, 'Products Id');
                cart.products.push({ productId: productId, count: 1, createAt: new Date() });
                cart.save().then(result => res.send({ success: true })).catch(err => res.send(err));
            }
        }
    });
}

decreaseCart = (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) return helper.requireField(res, '');
    Cart.findOne({ createBy: userId }, (err, cart) => {
        if (err) throw err;
        if (cart === null) return helper.notFound(res, 'User Id ' + userId);
        let product = cart.products.map(s => s.toObject()).find(s => s.productId === productId);
        Cart.update({ 'products._id': product._id },
            {
                '$set': {
                    'products.$.count': product.count > 0 && product.count - 1,
                }
            }
            , (err, Updated) => {
                if (err) throw err;
                return res.send({ success: Updated.ok === 1 });
            })
    });
}

removeProductCart = (req, res) => {
    const { cartId, id } = req.body;
    if (!cartId || !id) return helper.requireField(res, '');
    Cart.findById(cartId, (err, cart) => {
        if (err) throw err;
        if (cart === null) return helper.notFound(res, 'Cart ' + cartId);
        const cartRemove = cart.products.id(id);
        if (cartRemove) {
            cartRemove.remove();
            cart.save().then(result => res.send({ success: true })).catch(err => res.send(err));
        } else {
            return helper.notFound(res, 'Product Id ' + id);
        }
    });
}

removeCart = (req, res) => {
    const { cartId } = req.body;
    if (!cartId) return helper.requireField(res, 'Cart Id');
    Cart.remove({ _id: cartId }, (err, result) => {
        if (err) throw err;
        if (result === null) return helper.notFound(res, 'Cart Id ' + cartId);
        return res.send({ success: result.deletedCount === 1 });
    })
}


module.exports = {
    getCart,
    addCart,
    decreaseCart,
    removeProductCart,
    removeCart,
    getAllCart
}