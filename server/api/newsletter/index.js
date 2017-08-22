'use strict';

var express = require('express');
var controller = require('./newsletter.controller');

var router = express.Router();
// router.post('/', controller.create);
router.post('/', "I was called");

module.exports = router;
