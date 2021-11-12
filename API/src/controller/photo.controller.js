const fs = require('fs');
const responseHelper = require('../helper/service.helper');
const Photo = require('../model/photo.model');
const ObjectID = require('mongodb').ObjectID;

uploadPhoto = (req, response, next) => {
    let productId = req.body.foreignId;
    if (req.file === undefined || !ObjectID.isValid(productId)) {
        if (productId) { // Edit Mode
            return response.status(200).send({ message: 'Update Successfully' });
        }
        return responseHelper.uploadFail(response);
    }
    let item = {
        image: {
            data: fs.readFileSync(req.file.path),
            contentType: 'image/png',
        },
        path: req.file.path,
        foreignId: productId,
        uploadAt: new Date(),
    }
    var photo = new Photo(item);
    photo.save()
        .then(data => {
            return responseHelper.uploadSuccess(response, data._id);
        })
        .catch(err => {
            response.status(404).send({ message: err.message });
        });;
}

deletePhoto = (req, response) => {
    const id = req.body.id;
    if (!id) return responseHelper.requireField(response, 'Id');
    let findItem = { _id: id };
    Photo.findByIdAndDelete(findItem, (err, res) => {
        if (err) response.send(err);
        if (res.path) {
            fs.unlink(res.path, (err) => {
                if (err) response.send(err);
                return responseHelper.deleteSuccess(response);
            })
        } else {
            return responseHelper.notFound(response, id)
        }
    });
}

getAllPhoto = async (req, res) => {
    let result = [];
    await Photo.find()
        .then(list => result = list)
        .catch(err => {
            res.status(404).send({ message: err.message });
        })

    result = await result.map(item => ({
        id: item.id,
        foreignId: item.foreignId,
        file: item.image.data ? item.image.data.toString('base64') : null,
    }));

    return result;
}

module.exports = {
    uploadPhoto,
    getAllPhoto,
    deletePhoto,
}
