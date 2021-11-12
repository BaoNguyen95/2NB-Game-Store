
const Category = require('../model/category.model');
const helper = require('../helper/service.helper');

getAllCategory = (req, res) => {
    Category.find()
        .then(category => {
            category.sort()
            res.send(category);
        })
        .catch(err => {
            res.status(404).send({ message: err.message });
        });
}

addCategory = async (req, res) => {
    const item = req.body;
    let isExist = false;
    if (!item.name) {
        return res.status(404).send(`need to input 'name'`);
    }
    if (item._id !== '') {
        isExist = await helper.isExisted(res, Category, { _id: item._id });
    }
    if (isExist === false) {
        const category = new Category({ name: item.name });
        category.save()
            .then(data => { res.send(data._id); })
            .catch(err => {
                res.status(404).send({ message: err.message });
            });
    } else if (isExist === true) {
        editCategory(item, res);
    }
}

editCategory = (item, res) => {
    Category.findByIdAndUpdate(item._id, { name: item.name }, (err, result) => {
        if (err) res.send(err);
        if (result === null) {
            return helper.notFound(res, item._id);
        }
        res.status(200).send(result);
    })
}

deleteCategory = (req, res) => {
    const idURL = req.params.id;
    const _id = req.body.id;
    if (_id === null || _id === '' || _id === undefined) {
        return res.status(404).send({ message: "require 'id'", status: 404 });
    }
    if (idURL !== _id) {
        return helper.notFound(res, idURL);
    }
    const deleteItem = { _id: _id };
    Category.findOneAndDelete(deleteItem, (err, result) => {
        if (err) res.send(err);
        if (result === null) {
            return helper.notFound(res, _id);
        }
        helper.deleteSuccess(res);
    });
}

module.exports = {
    getAllCategory,
    addCategory,
    deleteCategory,
}