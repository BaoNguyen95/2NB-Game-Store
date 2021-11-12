
const Product = require('../model/product.model');
const Category = require('../model/category.model');
const Photo = require('../model/photo.model');
const fs = require('fs');
const helper = require('../helper/service.helper');
var PhotoController = require('./photo.controller');

getAllProducts = async (req, res) => {
    let listPhoto = await PhotoController.getAllPhoto();
    await Product.find({}).select({ name: 1, categoryId: 1 })
        .then(product => {
            product.map(s => {
                s.image = listPhoto.some(x => x.foreignId === s.id) ? listPhoto.find(x => x.foreignId === s.id) : null;
            })

            let result = {
                count: product.length,
                result: product
            }
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).send({ message: err.message });
        })
}

findProductById = async (req, response) => {
    const id = req.params.id;
    let photo = {};
    let categories = [];
    await Photo.findOne({ foreignId: id }, (err, res) => {
        if (err) throw err;
        photo = {
            file: res.image.data.toString('base64'),
        };
    });

    await Category.find({}, (err, res) => {
        if (err) throw err;
        categories = res;
    });

    await Product.findOne({ _id: id }, (err, res) => {
        if (err) return response.send(err);
        if (res === null) return helper.notFound(res, req.body.id);
        res = {
            id: res._id,
            name: res.name,
            category: categories.filter(x => res.categoryId.includes(x.id)),
            description: res.description,
            release_year: res.release_year,
            image: photo,
            price: res.price,
            discountPercent: res.discountPercent,
        };
        return helper.found(response, res);
    });
}

addProduct = async (req, response) => {
    const { name, _id, userId, categoryId, description, release_year, price, discountPercent } = req.body;

    if (!name) return helper.requireField(response, 'name');
    if (!userId) return helper.requireField(response, 'userId');

    let itemId = _id ? _id : '';

    const item = {
        id: itemId,
        name: name,
        categoryId: categoryId,
        description: description,
        release_year: release_year,
        updateAt: new Date(),
        createBy: userId,
        price: price,
        discountPercent: discountPercent,
    };

    if (item.id) { // Update
        let findItem = { _id: itemId };
        Product.findByIdAndUpdate(findItem, item, (error, res) => {
            if (error) return response.send(error);
            response.send(res._id);
        })
    } else { // Add New
        Category.findById({ _id: item.categoryId }, (err, res) => {
            if (err) console.log(err);
            if (res === null) return helper.notFound(response, "Category: " + item.category);
            delete item.id;
            const product = new Product(item);
            product.save()
                .then(data => { response.send(data._id); })
                .catch(err => {
                    response.send({ message: err.message });
                });
        })
    }
}

deleteProduct = (req, res) => {
    const _id = req.body.id;
    const deleteItem = { _id: _id };
    let photoPath = '';
    Product.findOneAndDelete(deleteItem, async (err, result) => {
        if (err) res.send(err);
        if (result === null) {
            return helper.notFound(res, _id);
        }
        await Photo.findOneAndDelete({ foreignId: _id }, (err, photo) => photoPath = photo ? photo.path : null);

        if (photoPath) {
            fs.unlink(photoPath, (err) => helper.deleteSuccess(res))
        } else {
            return helper.deleteSuccess(res);
        }
    });
}

// PageIndex: 
// PageSize: 
// SortColumn:
// SortOrder: 

searchProduct = async (req, res) => {
    let filterByCategory = { _id: req.body.category };
    const pagination = req.body.gridSetting;
    const skipValue = pagination.PageIndex * pagination.PageSize;
    let listCategory = [];

    if (filterByCategory._id == '' || filterByCategory._id == undefined) {
        filterByCategory = {};
    }
    let filterProductByCategoryId = { categoryId: filterByCategory._id };
    if (filterProductByCategoryId.categoryId == '' || filterProductByCategoryId.categoryId == undefined) {
        filterProductByCategoryId = {};
    }

    let listPhoto = await PhotoController.getAllPhoto();

    await Category.find(filterByCategory)
        .then(list => listCategory = list)
        .catch(err => {
            res.status(404).send({ message: err.message });
        })

    await Product.find(filterProductByCategoryId).skip(skipValue).limit(pagination.PageSize).sort({ release_year: -1 })
        .then(async product => {
            product = product.map(s => {
                s.category = listCategory.filter(x => s.categoryId.includes(x.id));
                s.image = listPhoto.some(x => x.foreignId === s.id) ? listPhoto.find(x => x.foreignId === s.id) : null;
                return {
                    _id: s._id,
                    name: s.name,
                    categoryId: s.categoryId,
                    category: s.category,
                    image: { file: s.image.file },
                    release_year: s.release_year,
                    price: s.price,
                    discountPercent: s.discountPercent,
                }
            })

            let result = {
                count: await Product.find(filterProductByCategoryId).countDocuments(),
                length: product.length,
                result: product,
            }
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).send({ message: err.message });
        });
}

searchAdminProduct = async (req, res) => {
    let filterByCategory = { _id: req.body.category };
    const pagination = req.body.gridSetting;
    const skipValue = pagination.PageIndex * pagination.PageSize;
    const productName = req.body.productName;

    let listCategory = [];

    if (filterByCategory._id == '' || filterByCategory._id == undefined) {
        filterByCategory = {};
    }
    let filterProductByCategoryId = { categoryId: filterByCategory._id };
    if (filterProductByCategoryId.categoryId == '' || filterProductByCategoryId.categoryId == undefined) {
        filterProductByCategoryId = {};
    }

    let listPhoto = await PhotoController.getAllPhoto();

    await Category.find(filterByCategory)
        .then(list => listCategory = list)
        .catch(err => {
            res.status(404).send({ message: err.message });
        })

    const findProduct = { ...filterProductByCategoryId, name: new RegExp(productName, 'i') };

    await Product.find(findProduct).skip(skipValue).limit(pagination.PageSize).sort({ updateAt: -1 })
        .then(async product => {
            const list = product.map(s => {
                s.category = listCategory.filter(x => s.categoryId.includes(x.id));
                s.image = listPhoto.some(x => x.foreignId === s.id) ? listPhoto.find(x => x.foreignId === s.id) : null;
                return {
                    _id: s._id,
                    name: s.name,
                    category: s.category,
                    categoryId: s.categoryId,
                    description: s.description,
                    price: s.price,
                    discountPercent: s.discountPercent,
                    release_year: s.release_year,
                    image: s.image,
                };
            })

            const result = {
                count: productName ? product.length : await Product.find(filterProductByCategoryId).countDocuments(),
                length: list.length,
                result: list,
            }
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).send({ message: err.message });
        });
}

findRelateProducts = async (req, res) => {
    const categoryId = req.body.categoryId;
    const itemId = req.body.id;
    const pagination = req.body.gridSetting;
    const skipValue = pagination.PageIndex * pagination.PageSize;

    if (!categoryId || !itemId) return helper.requireField(res, 'categoryId');

    const photos = await PhotoController.getAllPhoto();
    const findItem = { categoryId: { $in: categoryId } };

    await Product.find(findItem).skip(skipValue).limit(pagination.PageSize).sort({ updateAt: -1 })
        .then(product => {
            product = product.filter(x => x.id !== itemId).map(x => ({
                id: x.id,
                name: x.name,
                image: photos.find(s => s.foreignId === x.id).file,
            }));

            let result = {
                count: product.length,
                result: product
            }
            return res.status(200).send(result);
        })
        .catch(err => res.send(err.message))
}

module.exports = {
    getAllProducts,
    findProductById,
    addProduct,
    deleteProduct,
    searchProduct,
    searchAdminProduct,
    findRelateProducts
}