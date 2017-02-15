'use strict';

var express = require('express');
var controller = require('./checkoutForm.controller');

var router = express.Router();

router.get('/', controller.index);
// router.post('/', controller.create);

router.post('/', controller.postCieloApi);
// router.get('/:id', controller.getCieloApi);

module.exports = router;
