'use strict';

var express = require('express');
var controller = require('./imageGallery.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/signing', controller.signing);
router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', controller.upsert);
router.delete('/:id', controller.destroy);

module.exports = router;
