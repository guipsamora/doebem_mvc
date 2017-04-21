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
import Transaction from './checkoutForm.model';
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

export function postCieloApi(req, res) {
  console.log('postCieloApi foi chamado');
  //console.log(req);
  const postPromise = new Promise((resolve, reject) => {
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
    .then(response => {
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
  const putPromise = new Promise( (resolve, reject) => {
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
    .then(response => {
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

const authRequest = res => {
  return entity => {
    console.log('authRequest', entity);
    const Customer = {};
    const Payment = {};

    Customer.Name = entity.donor.name;
    Payment.Amount = entity.paymentInfo.amount;
    Payment.Type = entity.paymentInfo.type;
    Payment.Installments = entity.paymentInfo.type;

    return requestify.post('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
      body: {
        Customer,
        Payment,
        MerchantOrderId: entity._id,
      },
      headers: {
        'Content-Type': 'application/json',
        MerchantId: process.env.MerchantId,
        MerchantKey: process.env.MerchantKey
      },
      dataType: 'json'
    })
      .then(response => {
        console.log('Requestify deu certo no postCieloApi');
        return response.getBody();
      })
      .catch(error => {
        console.log('Requestify no postCieloApi apresentou o seguinte erro: ', error);
        return Promise.reject(error);
      });
  };
};


export const createTransaction = (req, res) => {
  //criar a transação no Mongo
  const transaction = {};
  transaction.donor = {};
  transaction.donor.name = req.body.Customer.Name;
  transaction.donor.email = req.body.Customer.Email;
  transaction.donor.cpf = req.body.Customer.CPF;
  transaction.donor.source = req.body.Customer.Source;
  transaction.donor.cidade = req.body.Customer.Cidade;
  transaction.paymentInfo = {};
  transaction.paymentInfo.type = req.body.Payment.Type;
  transaction.paymentInfo.amount = req.body.Payment.Amount;
  transaction.paymentInfo.installments = req.body.Payment.Installments;
  // salvar no banco e pegar o ID
  return Transaction.create(transaction)
    .then(authRequest(res))
    .catch(handleError(res));
};


export function handlePayment(req, res) {
  return postCieloApi(req.body)
  .then(responsePost => {
    req.body.AuthorizationResponse = JSON.parse(responsePost);
    return req.body;
  })
  .then(reqAuth => {
    return CheckoutForm.create(reqAuth)
    .then(respondWithResult(res, 201))
    .catch(error => {
      console.log('create na API da Transaction', error);
      return handleError(res);
    });
  })
  .then(responseCreate => {
    return captureCieloApi(responseCreate)
    .then(responsePut => {
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
