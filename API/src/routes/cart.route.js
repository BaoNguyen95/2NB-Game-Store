
var CONSTANTS = require('../constants/all.constants');
var express = require('express');
var router = express.Router();

const mw = require('../middleware/authentication');
const URL = CONSTANTS.API.CART_API;

const Cart = require('../controller/cart.controller');

router.get(URL.GET_CART, mw.auth, Cart.getCart);
router.get(URL.GET_ALL, Cart.getAllCart);
router.post(URL.ADD_CART, Cart.addCart);
router.post(URL.DECREASE_CART, Cart.decreaseCart);
router.post(URL.REMOVE_BY_PRODUCT, Cart.removeProductCart);
router.post(URL.REMOVE_ALL, Cart.removeCart);

module.exports = router;