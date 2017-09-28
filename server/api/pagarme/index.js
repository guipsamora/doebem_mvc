'use strict';

var express = require('express');
var controller = require('./pagarme.controller');

var router = express.Router();
router.post('/', controller.postPagarme);

module.exports = router;
