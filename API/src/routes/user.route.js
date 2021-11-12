
var CONSTANTS = require('../constants/all.constants');
var express = require('express');
var mw = require('../middleware/authentication');

var router = express.Router();

const URL = CONSTANTS.API.USER_API;

const User = require('../controller/user.controller');

router.get(URL.GET_USER_PROFILE, mw.auth, User.getUserProfile);
router.post(URL.LOGOUT, User.logout);
router.post(URL.ADD_USER, User.createUser);
router.post(URL.CHECK_EXIST_USER, User.checkExistUser);
router.post(URL.LOGIN, User.login);
router.post(URL.UPDATE_USER, mw.auth, User.updateUser);
router.post(URL.SEARCH_USER, mw.auth, User.searchUsers);
router.post(URL.DELETE_USER, mw.auth, User.deleteUser);
router.post(URL.CHECK_EXPIRY_TOKEN, User.checkExpireToken);

module.exports = router;