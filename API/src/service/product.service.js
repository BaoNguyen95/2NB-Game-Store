const Product = require('../model/product.model');
const Category = require('../model/category.model');
const Photo = require('../model/photo.model');
const fs = require('fs');
const helper = require('../helper/service.helper');
var PhotoController = require('../controller/photo.controller');


getProductById = async (productIds, callback) => {
    const photos = await PhotoController.getAllPhoto();
    const categories = await Category.find({});
    Product.find({ '_id': { $in: productIds } }, (err, product) => {
        if (err) throw err;
        let result = [];
        product.map(s => result.push({
            id: s.id,
            name: s.name,
            categoryId: s.categoryId,
            category: categories.filter(x => s.categoryId.includes(x.id)),
            image: s.image = photos.some(x => x.foreignId === s.id) ? photos.find(x => x.foreignId === s.id) : null,
        }));
        callback(result);
    })
}

module.exports = {
    getProductById,
}