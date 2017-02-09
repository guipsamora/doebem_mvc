'use strict';

import mongoose from 'mongoose';

var checkoutFormSchema = new mongoose.Schema({
  //  MerchantOrderId:"2014111703",
   Customer: {
      Name: {
        type: 'String',
        required: true,
      },
      Email: {
        type: 'String',
        required: true,
      },
      CPF: {
        type: 'String',
        required: true,
      },
      Cidade: {
        type: 'String',
        required: true,
      }
   }
   ,
   Payment: {
     //  iremos aceitar apenas cartão de crédito
    //  Type: "CreditCard",
     Amount: {
        type: 'Number',
        required: true
     },
     Installments: {
        type: 'Number',
        required: true
     },
     CreditCard: {
         CardNumber: {
            type: 'String',
            required: true
         },    
         ExpirationDate: {
            type: 'String',
            required: true
         },
         SecurityCode: {
            type: 'String',
            required: true
         },
         Brand: {
          type: 'String',
          required: true
         }
     }
   }
});

export default mongoose.model('checkoutForm', checkoutFormSchema);
