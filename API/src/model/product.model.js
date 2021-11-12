const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    categoryId: [String],
    release_year: String,
    description: String,
    image: Buffer | ArrayBuffer | String,
    updateAt: Date,
    createBy: String,
    price: Number,
    discountPercent: Number,
});

module.exports = mongoose.model('Product', ProductSchema);