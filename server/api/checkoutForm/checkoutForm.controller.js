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

var cieloURL = 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/';

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
  var headers = {
    MerchantId:'65762591-82a8-4194-b64c-0e506e7a0eaa',
    MerchantKey: 'ZHGRIUQBYITBCCVQMTHIPHXPZEIEVGOJFZUAVVSJ',
    'Content-Type': 'application/json'
  }
  
  var options = {
    url: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',
    method:'POST',
    header: headers
 
  };
  console.log(req.params);

  requestify.post(CheckoutForm)
    //.then(res => response.getBody)
    .then(respondWithResult(res));
}

// Counts the length of the database and gives to the MerchantOrderId
// export function countDatabase(req, res) {
    
//     console.log(CheckoutForm.
// }



// Creates a new Transaction in the DB
export function create(req, res) {


  return CheckoutForm.create(req.body)
    .then(respondWithResult(res, 201))
    .then(countDatabase(req,res))
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
