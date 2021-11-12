
var CONSTANTS = require('../constants/all.constants');
var express = require('express');
var router = express.Router();

const URL = CONSTANTS.API.PRODUCT_API;

const Product = require('../controller/product.controller');

router.get(URL.GET_ALL, Product.getAllProducts);
router.get(URL.FIND_PRODUCT_BY_ID, Product.findProductById);
router.post(URL.PRODUCT_ADD, Product.addProduct);
router.post(URL.PRODUCT_DELETE, Product.deleteProduct);
router.post(URL.ALL_PRODUCTS, Product.searchProduct);
router.post(CONSTANTS.API.ADMIN_PRODUCT.ALL_PRODUCTS, Product.searchAdminProduct);
router.post(URL.FIND_RELATE_PRODUCT, Product.findRelateProducts);

module.exports = router;