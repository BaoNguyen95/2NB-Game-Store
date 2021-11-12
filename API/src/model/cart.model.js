const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({ productId: String, count: Number, createAt: Date });

const Cart = mongoose.Schema({
    products: [product],
    createBy: String,
    createAt: Date,
});

module.exports = mongoose.model('Cart', Cart);