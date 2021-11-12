
var CONSTANTS = require('../constants/all.constants');
var express = require('express');
var router = express.Router();
const URL = CONSTANTS.API.ROLE_API;
const Role = require('../controller/role.controller');
const mw = require('../middleware/authentication');

router.post(URL.ADD, Role.AddRole);
router.post(URL.UPDATE, Role.UpdateRole);
router.get(URL.GET_ALL, Role.GetAllRoles);

module.exports = router;