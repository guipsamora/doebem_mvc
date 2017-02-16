'use strict';

var express = require('express');
var controller = require('./checkoutForm.controller');

var router = express.Router();

router.get('/', controller.index);
// router.post('/', controller.create);

// Post para autorização da CIELO
// Colocar alguma autorização no segundo argumento do post (secret de sessão)
router.post('/', controller.postCieloApi);

// router.get('/:id', controller.getCieloApi);

// Post para captura da CIELO


module.exports = router;
