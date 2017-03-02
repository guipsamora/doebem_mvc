'use strict';

import mongoose from 'mongoose';

var donationSchema = new mongoose.Schema({
  MerchantOrderId: { type: 'String', required: true },
  Payment: {
    // iremos aceitar apenas cartão de crédito
    // default cartão de crédito para todas as operações
    Type: { type: 'String', required: true },
    Amount: { type: 'Number', required: true },
    // default número de parcelas ser apenas 1, não iremos parcelar doação né
    Installments: { type: 'Number', required: true }
  }
});

var linksSchema = new mongoose.Schema({ 
  Method: 'String', 
  Rel: 'String', 
  Href: 'String' 
});

var paymentSchema = new mongoose.Schema({
      Installments: { type: 'Number', required: true },
      Interest: { type: 'String', required: true },
      Capture: { type: 'Boolean', required: true },
      Authenticate: { type: 'Boolean', required: true },
      CreditCard: {
        CardNumber: { type: 'String', required: true },
        Holder: { type: 'String' },
        ExpirationDate: { type: 'String', required: true },
        SaveCard: { type: 'Boolean', required: true },
        Brand: { type: 'String', required: true }
      },
      ProofOfSale: { type: 'String', required: true },
      Tid: { type: 'String', required: true },
      AuthorizationCode: { type: 'String', required: true },
      PaymentId: { type: 'String', required: true },
      Type: { type: 'String', required: true },
      Amount: { type: 'Number', required: true },
      Currency: { type: 'String', required: true },
      Country: { type: 'String', required: true },
      ExtraDataCollection: [],
      Status: { type: 'Number', required: true },
      ReturnCode: { type: 'String', required: true },
      ReturnMessage: { type: 'String', required: true },
      Links: [linksSchema]
});

var authorResponseSchema = new mongoose.Schema({
    MerchantOrderId: { type: 'String', required: true },
    Customer: {
        Name: { type: 'String', required: true }
    },
    Payment: paymentSchema,
});

var captureResponseSchema = new mongoose.Schema({ 
    Status: { type: 'Number', required: true },
    ReturnCode: { type: 'String', required: true },
    ReturnMessage: { type: 'String', required: true },
    Links: [linksSchema]
});

var donatorSchema = new mongoose.Schema({
  Customer: {
    Name: { type: 'String', required: true },
    Email: { type: 'String', required: true },
    CPF: { type: 'String', required: true },
    Cidade: { type: 'String', required: true},
    Source: { type: 'String', required: true}
  },
  MerchantOrderId: { type: 'String', required: true },
  Transactions: donationSchema,
  AuthorizationResponse: authorResponseSchema,
  CaptureResponse: captureResponseSchema,
});

// ----------------------------------------------------------------//
// Criar outro index no mongo
// ----------------------------------------------------------------//

// MerchantOrderId.index({ MerchantOrderId: 1 });



// ----------------------------------------------------------------//
// MODELO DE OBJETO QUE A CIELO PEDE E JÁ TESTADO - APENAS CONSULTA
// ----------------------------------------------------------------//
// var checkoutFormSchema = new mongoose.Schema({

//   MerchantOrderId:{
//      type: 'String',
//      default: '2014111703'
//   },

//   Customer: {
//     Name: {
//       type: 'String',
//       required: true,
//     },
//     Email: {
//       type: 'String',
//       required: true,
//     },
//     CPF: {
//       type: 'String',
//       required: true,
//     },
//     Cidade: {
//       type: 'String',
//       required: true,
//     }
//   },
//   Payment: {
//    //  iremos aceitar apenas cartão de crédito
//     Type: {
//       type: 'String',
//       // default cartão de crédito para todas as operações
//       default: 'CreditCard',
//       required: true,
//     },
//     Amount: {
//       type: 'Number',
//       required: true
//     },
//     Installments: {
//       type: 'Number',
//       required: true,
//       // default número de parcelas ser apenas 1, não iremos parcelar doação né
//       default: 1
//     },
//     CreditCard: {
//       CardNumber: {
//         type: 'String',
//         required: true
//       },
//       ExpirationDate: {
//         type: 'String',
//         required: true
//       },
//       SecurityCode: {
//         type: 'String',
//         required: true
//       },
//       Brand: {
//         type: 'String',
//         required: true
//     }
//    }
//   }
// });

export default mongoose.model('checkoutForm', donatorSchema);
