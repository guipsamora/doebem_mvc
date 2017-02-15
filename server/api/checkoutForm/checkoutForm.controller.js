/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/checkoutForm              ->  index
 * POST    /api/checkoutForm              ->  create
 * GET     /api/checkoutForm/:id          ->  show
 * PUT     /api/checkoutForm/:id          ->  upsert
 * PATCH   /api/checkoutForm/:id          ->  patch
 * DELETE  /api/checkoutForm/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import CheckoutForm from './checkoutForm.model';
import requestify from 'requestify';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Transaction
export function index(req, res) {
  return CheckoutForm.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Transaction from the DB from id or from slug...
export function show(req, res) {
  return CheckoutForm.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => {
      CheckoutForm.findOne({slug: req.params.id}).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(err));
    });
}

export function postCieloApi(req, res) {

    console.log('postCieloApi Foi chamado');
    
    // CheckoutForm.create(req.body)
    //   .then(respondWithResult(res, 201))
    //   .catch(error => {
    //     console.log('create na API da Transaction', error);
    //     return handleError(res);
    // });
    
    // console.log(formBody);
    var formBody = req.body;
    console.log(formBody);
    
    return requestify.request('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
        method: 'POST',
        // body: {
        //     "Payment" : {
        //         "Amount" : 10000,
        //         "CreditCard" : {
        //             "Brand" : "Visa",
        //             "CardNumber" : "4633120131480991",
        //             "ExpirationDate" : "12/2020",
        //             "SecurityCode" : "123"
        //         },
        //         "Installments" : 1,
        //         "Type" : "CreditCard"
        //     },
        //     "Customer" : {
        //         "Name" : "Guilherme Samora",
        //         "Email" : "gui.psamora@gmail.com",
        //         "Cidade" : "Los Angeles",
        //         "CPF" : "22984904818"
        //     },
        //     "MerchantOrderId" : "2014111703",
        // },


        // USANDO O FORMULARIO

        body: {
          formBody,
          "MerchantOrderId" : "2014111703",
        },
        headers: {
            'Content-Type': 'application/json',
            MerchantId: process.env.MerchantId,
            MerchantKey: process.env.MerchantKey
        },
        dataType: 'json'        
    })
    .then(function(response) {
        // get the response body
        response.getBody();

        // get the response headers
        response.getHeaders();

        // get specific response header
        response.getHeader('Accept');

        // get the code
        response.getCode();

        // // Get the response raw body
        var a = response.body;
        console.log(a);
        console.log('requestify deu certo')
    }).catch(error => {
      console.log('create na API da Transaction', error);
      return handleError(res);
    });
    ;
}

// export function getCieloApi(req, res) {

//     console.log('getCieloApi Foi chamado');
   
//     return requestify.get('https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/284a560e-543b-4cf1-bd0b-d7fed8c2c7c6')
//       .then(function(response) {
//         // Get the response body
//         response.getBody();

//         // Get the response raw body
//         response.body;
//             console.log(response.body);
//       });
// }

// Counts the length of the database and gives to the MerchantOrderId
// export function countDatabase(req, res) {
    
//     console.log(CheckoutForm.
// }



// Creates a new Transaction in the DB
export function create(req, res) {
  return CheckoutForm.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(error => {
      console.log('create na API da Transaction', error);
      return handleError(res);
    });
}

// Upserts the given Thing in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return CheckoutForm.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Transaction in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return CheckoutForm.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Transaction from the DB
export function destroy(req, res) {
  return CheckoutForm.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
