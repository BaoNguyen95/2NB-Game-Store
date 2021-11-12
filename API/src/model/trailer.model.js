const mongoose = require('mongoose');

const Trailer = mongoose.Schema({
    url: String,
    productId: String,
});

module.exports = mongoose.model('Trailer', Trailer);