
const CONSTANTS = require('../constants/all.constants');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const ObjectID = require('mongodb').ObjectID;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, './src/images'); //  debug
        cb(null, './images');// none debug
    },
    filename: (req, file, cb) => {
        cb(null, new ObjectID() + '_' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Photo = require('../controller/photo.controller');
const URL = CONSTANTS.API.PHOTO;

router.use('/image', express.static('./images'));

router.post(URL.ADD, upload.single('file'), Photo.uploadPhoto);
router.post(URL.DELETE, Photo.deletePhoto);
router.get(URL.GET_ALL, Photo.getAllPhoto);

module.exports = router;