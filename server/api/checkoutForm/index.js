'use strict';

var express = require('express');
var controller = require('./checkoutForm.controller');

var router = express.Router();

router.get('/', controller.index);

// --------------------------------//
// Post para o banco de dados
// --------------------------------//

router.post('/', controller.createTransaction);


// --------------------------------//
// Post para autorização da CIELO
// --------------------------------//

// Colocar alguma autorização no segundo argumento do post (secret de sessão)
// router.post('/', controller.postCieloApi);

// --------------------------------//
// Post para captura da CIELO
// --------------------------------//
// router.get('/:id', controller.getCieloApi);


module.exports = router;
