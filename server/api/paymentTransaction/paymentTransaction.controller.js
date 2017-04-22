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
export const create = (req, res) => createTransactionCielo(req.body, res)
  .then(authRequestCielo(res, req.body))
  .then(respondWithResult(res, 201))
  .catch(handleError(res));

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
  transaction.paymentInfo = {};
  transaction.paymentInfo.type = body.paymentInfo.type;
  transaction.paymentInfo.amount = body.paymentInfo.amount;
  transaction.paymentInfo.installments = body.paymentInfo.installments;
  // salvar no banco e pegar o ID
  return Transaction.create(transaction)
    .catch(handleError(res));
};

const authRequestCielo = (res, body) => entity => {
  const order = {
    MerchantOrderId: entity._id.toString(),
    Customer: {
      Name: entity.donor.name,
    },
    Payment: {
      Type: entity.paymentInfo.type,
      Amount: entity.paymentInfo.amount,
      Installments: entity.paymentInfo.installments,
      SoftDescriptor: 'Doacao doebem',
      CreditCard: {
        CardNumber: body.paymentInfo.ccInfo.number,
        Holder: entity.donor.name,
        ExpirationDate: body.paymentInfo.ccInfo.expDate,
        SecurityCode: body.paymentInfo.ccInfo.securityCode,
        Brand: body.paymentInfo.ccInfo.brand
      }
    }
  };


  const teste2 = {
    MerchantOrderId: '58f985c628c61683ff675ab2',
    Customer: {
      Name: 'MARLI R GOLDENBERG'
    },
    Payment: {
      Type: 'Credicard',
      Amount: 10000000,
      Installments: 1,
      Credicard:
      {
        CardNumber: '5545630022015791',
        ExpirationDate: '12/2020',
        Brand: 'Master'
      }
    }
  };

  const teste = {
    MerchantOrderId: '2014111703',
    Customer: {
      Name: 'Comprador crédito simples'
    },
    Payment: {
      Type: 'CreditCard',
      Amount: 15700,
      Installments: 1,
      SoftDescriptor: '123456789ABCD',
      CreditCard: {
        CardNumber: '1234123412341231',
        Holder: 'Teste Holder',
        ExpirationDate: '12/2030',
        SecurityCode: '123',
        Brand: 'Visa'
      }
    }
  };

  console.log('order: ', order, 'teste: ', teste);
  return requestify.request('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
    method: 'POST',
    body: order,
    headers: {
      'Content-Type': 'application/json',
      MerchantId: process.env.MerchantId,
      MerchantKey: process.env.MerchantKey
    },
    dataType: 'json'
  })
    .then(response => {
      console.log('Requestify deu certo no authRequestCielo', response.getBody());
      return response.getBody();
    })
    .catch(error => {
      console.log('Requestify no authRequestCielo apresentou o seguinte erro: ', error);
      return Promise.reject(error);
    });
};

/*Payment:
   { ServiceTaxAmount: 0,
     Installments: 1,
     Interest: 0,
     Capture: false,
     Authenticate: false,
     Recurrent: false,
     CreditCard:
      { CardNumber: '544731******7010',
        Holder: 'Guilherme Samora',
        ExpirationDate: '12/2020',
        SaveCard: false,
        Brand: 'Master' },
     Tid: '0422043417190',
     ProofOfSale: '3417190',
     AuthorizationCode: '987051',
     SoftDescriptor: 'Doacao doebem',
     Provider: 'Simulado',
     PaymentId: 'f1f524d3-ca81-4159-91f8-27d841944183',
     Type: 'CreditCard',
     Amount: 1000,
     ReceivedDate: '2017-04-22 16:34:16',
     Currency: 'BRL',
     Country: 'BRA',
     ReturnCode: '4',
     ReturnMessage: 'Operation Successful',
     Status: 1,
     Links: [ [Object], [Object], [Object] ] } }
     */