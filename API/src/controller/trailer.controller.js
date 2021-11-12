
const Trailer = require('../model/trailer.model');
const helper = require('../helper/service.helper');

addTrailer = (req, res) => {
    const _productId = req.body.productId;
    let _url = req.body.url;
    if (!_url.includes('embed')) {
        const isWrongFormat = !req.body.url.includes('watch?v=');
        if (isWrongFormat) return res.send({ message: 'url is wrong format' });
        _url = _url.replace('watch?v=', 'embed/');
    }

    if (!_productId) return helper.requireField(res, 'Product Id');
    if (!_url) return helper.requireField(res, 'Product Id');

    Trailer.findOne({ productId: _productId }, (err, trailer) => {
        if (err) return res.send(err);
        if (trailer == null) { // add new
            const newTrailer = new Trailer({ url: _url, productId: _productId });
            newTrailer.save()
                .then((result) => {
                    res.send(result.id);
                }).catch((err) => {
                    res.status(404).send({ message: err.message });
                });
        } else { // update
            const updateItem = { url: _url }
            Trailer.findByIdAndUpdate(trailer.id, updateItem, (err, updatedTrailer) => {
                if (err) return res.send(err);
                res.send({ url: updateItem.url });
            });
        }
    })
}

getTrailerAdmin = (req, res) => {
    const _productId = req.params.productId;
    if (!_productId) return helper.requireField(res, 'Product Id');
    Trailer.findOne({ productId: _productId }, (err, trailer) => {
        if (err) return err;
        if (trailer === null) return helper.notFound(res, 'Product Id');
        res.send({ id: trailer.id, url: trailer.url })
    });
}

getTrailerProduct = (req, res) => {
    const _productId = req.params.productId;
    if (!_productId) return helper.requireField(res, 'Product Id');
    Trailer.findOne({ productId: _productId }, (err, trailer) => {
        if (err) return err;
        if (trailer === null) return helper.notFound(res, 'Product Id');
        res.send({ url: trailer.url });
    });
}

module.exports = {
    addTrailer,
    getTrailerAdmin,
    getTrailerProduct
}

