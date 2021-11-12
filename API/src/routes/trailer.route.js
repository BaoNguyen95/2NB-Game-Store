
var CONSTANTS = require('../constants/all.constants');
var express = require('express');
var router = express.Router();

const URL = CONSTANTS.API.TRAILER;

const Trailer = require('../controller/trailer.controller');

router.post(URL.ADD_TRAILER, Trailer.addTrailer);
router.get(URL.GET_TRAILER_ADMIN, Trailer.getTrailerAdmin);
router.get(URL.GET_TRAILER_PRODUCT, Trailer.getTrailerProduct);

module.exports = router;