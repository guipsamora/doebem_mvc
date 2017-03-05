/*
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/checkoutForm              ->  index
 * POST    /api/checkoutForm              ->  create
 * GET     /api/checkoutForm/:id          ->  show
 * PUT     /api/checkoutForm/:id          ->  upsert
 * PATCH   /api/checkoutForm/:id          ->  patch
 * DELETE  /api/checkoutForm/:id          ->  destroy
 */

// 'use strict';

import jsonpatch from 'fast-json-patch';
import CheckoutForm from './checkoutForm.model';
import requestify from 'requestify';
// const winston = require('winston');

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
  console.log('postCieloApi foi chamado');
  const postPromise = new Promise(function(resolve, reject) {
    requestify.request('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
      method: 'POST',
      body: {
        Customer: req.Customer,
        Payment: req.Payment,
        MerchantOrderId: req.MerchantOrderId,
      },
      headers: {
        'Content-Type': 'application/json',
        MerchantId: process.env.MerchantId,
        MerchantKey: process.env.MerchantKey
      },
      dataType: 'json'
    })
    .then(function(response) {
      console.log('Requestify deu certo no postCieloApi');
      // get the response body
      response.getBody();

      // get the response headers
      response.getHeaders();

      // get specific response header
      response.getHeader('Accept');

      // get the code
      response.getCode();

      resolve(response.body);
    })
    .catch(error => {
      console.log('Requestify no postCieloApi apresentou o seguinte erro: ', error);
      reject(error);
      return handleError(res);
    });
  });
  return postPromise;
}

export function captureCieloApi(req, res) {
  console.log('captureCieloApi foi chamado');
  const putPromise = new Promise(function (resolve, reject) {
    requestify.request(req.req.body.AuthorizationResponse.Payment.Links[1].Href, {
      method: 'PUT',
      body: {
        PaymentId: req.req.body.AuthorizationResponse.Payment.PaymentId,
      },
      headers: {
        'Content-Type': 'application/json',
        MerchantId: process.env.MerchantId,
        MerchantKey: process.env.MerchantKey
      },
      dataType: 'json'
    })
    .then(function(response) {
      console.log('requestify deu certo no captureCieloApi');
      // get the response body
      response.getBody();

      // get the response headers
      response.getHeaders();

      // get specific response header
      response.getHeader('Accept');

      // get the code
      response.getCode();

      resolve(response.body);
    })
    .catch(error => {
      console.log('Requestify no captureCieloApi apresentou o seguinte erro: ', error);
      reject(error);
      return handleError(res);
    });
  });
  return putPromise;
}


// Creates a new Transaction in the DB
// export function create(req, res) {
  // console.trace(req.body);
  // var info = req.body;
  // var checkout = new CheckoutForm({MerchantOrderId: "TESTE"});

  // console.trace(checkout);
  // console.log(checkout);
  // // checkout = postCieloApi(req, res).then(function(success) {
  // //   console.trace(success);
  // //   return success}
  // // );  

  // return postCieloApi(req, res)
  // .then(function(success) {
  //   CheckoutForm.Transactions.create(success);
  //   console.trace(success);
  //   return success}
  // ).then(
  //   CheckoutForm.save(req.body)
  // ).then(respondWithResult(res, 201))
  //  .catch(error => {
  //     console.log('create na API da Transaction', error);
  //     return handleError(res);
  //  });


  // chamar post Cielo e colocar no CheckoutForm
  // return CheckoutForm.create(req.body)
  //   .then(function() {
  //     return postCieloApi(req, res)
  //     .then(saveAuthor)
  //   })
  //   .then(respondWithResult(res, 201))
  //   .catch(error => {
  //     console.log('create na API da Transaction', error);
  //     return handleError(res);
  //   });
// }

export function handlePayment(req, res) {
  return postCieloApi(req.body)
  .then(function(responsePost) {
    req.body.AuthorizationResponse = JSON.parse(responsePost);
    return req.body;
  })
  .then(function(reqAuth) {
    return CheckoutForm.create(reqAuth)
    .then(respondWithResult(res, 201))
    .catch(error => {
      console.log('create na API da Transaction', error);
      return handleError(res);
    });
  })
  .then(function(responseCreate) {
    return captureCieloApi(responseCreate)
    .then(function(responsePut) {
      req.body.CaptureResponse = JSON.parse(responsePut);
      return CheckoutForm.findOneAndUpdate({MerchantOrderId: req.body.MerchantOrderId }, {$set: req.body}, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
      .catch(error => {
        console.log('Update na API Transactions got an error: ', error);
        return handleError(res);
      });
    });
  })
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
