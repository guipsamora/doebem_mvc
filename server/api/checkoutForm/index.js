'use strict';

var express = require('express');
var controller = require('./checkoutForm.controller');

var router = express.Router();

var cieloURL = 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/';

router.get('/', controller.index);
router.post('/', controller.create);
router.post('/', controller.postCieloApi);

module.exports = router;
