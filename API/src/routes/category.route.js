
var CONSTANTS = require('../constants/all.constants');
var express = require('express');
var router = express.Router();

const URL = CONSTANTS.API.CATEGORY_API;

const Category = require('../controller/category.controller');

router.get(URL.CATEGORY, Category.getAllCategory);
router.post(URL.CATEGORY, Category.addCategory);
router.post(URL.CATEGORY_DELETE, Category.deleteCategory);

module.exports = router;