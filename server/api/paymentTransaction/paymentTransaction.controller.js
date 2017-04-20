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
import Transaction from './paymentTransaction.model';
import requestify from 'requestify';

const respondWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;
  return entity => {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
};

const patchUpdates = patches => entity => {
  try {
    jsonpatch.apply(entity, patches, /*validate*/ true);
  } catch(err) {
    console.log('error at patchUpdates paymentTransaction', err);
    return Promise.reject(err);
  }
  return entity.save();
};

const removeEntity = res => entity => {
  if(entity) {
    return entity.remove()
      .then(() => {
        res.status(204).end();
      });
  }
};

const handleEntityNotFound = res => entity => {
  if(!entity) {
    console.log('error at handleEntityNotFound paymentTransaction');
    res.status(404).end();
    return null;
  }
  return entity;
};

const handleError = (res, statusCode) => {
  statusCode = statusCode || 500;
  return err => {
    console.log('error at paymentTransaction', err);
    res.status(statusCode).send(err);
  };
};

// Gets a list of Transaction
export const index = (req, res) => Transaction.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));

// Gets a single Transaction from the DB from id or from slug...
export const show = (req, res) => Transaction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => {
      Transaction.findOne({slug: req.params.id}).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(err));
    });

// Upserts the given Transaction in the DB at the specified ID
export const upsert = (req, res) => {
  if(req.body._id) {
    delete req.body._id;
  }
  return Transaction.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Updates an existing Transaction in the DB
export const patch = (req, res) => {
  if(req.body._id) {
    delete req.body._id;
  }
  return Transaction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Deletes a Transaction from the DB
export const destroy = (req, res) => Transaction.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));

// Creates a new Transaction in the DB
export const create = (req, res) => {
  console.log('entao');
  return createTransactionCielo(req.body, res)
    .then(authRequestCielo(res, req.body))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
};

/**
 * area de controle do processamento do cartão CIELO
*/

/**
 * salva a primeira parte do processo para cielo
 * aonde recupera o ID para ser usado no campo
 */
const createTransactionCielo = (body, res) => {
  const transaction = {};
  transaction.donor = body.donor;
  /*transaction.donor.name = body.Customer.Name;
  transaction.donor.email = body.Customer.Email;
  transaction.donor.cpf = body.Customer.CPF;
  transaction.donor.source = body.Customer.Source;
  transaction.donor.cidade = body.Customer.Cidade;*/
  transaction.paymentInfo = {};
  transaction.paymentInfo.type = body.paymentInfo.type;
  transaction.paymentInfo.amount = body.paymentInfo.amount;
  transaction.paymentInfo.installments = body.paymentInfo.installments;
  // salvar no banco e pegar o ID
  return Transaction.create(transaction)
    .catch(handleError(res));
};

const authRequestCielo = (res, body) => entity => {
  const Customer = {};
  const Payment = {};
  //console.log('process.env.MerchantId', body.Payment);
  Customer.Name = entity.donor.name;
  Payment.Amount = entity.paymentInfo.amount;
  Payment.Type = entity.paymentInfo.type;
  Payment.Installments = entity.paymentInfo.installments;
  //Payment.Credicard = {};
  const CC = body.Payment.Credicard;
  console.log('CC', CC);
  Payment.Credicard = CC;
  console.log('payment', Payment);
  return requestify.request('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
    method: 'POST',
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
      console.log('Requestify deu certo no authRequestCielo');
      return response.getBody();
    })
    .catch(error => {
      console.log('Requestify no authRequestCielo apresentou o seguinte erro: ', error);
      return Promise.reject(error);
    });
};

