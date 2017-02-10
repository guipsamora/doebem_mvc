'use strict';

import mongoose from 'mongoose';

var checkoutFormSchema = new mongoose.Schema({

  MerchantId: {
    type: 'String',
    required: true,
    default: process.env.MerchantId
  },

  MerchantKey: {
    type: 'String',
    required: true,
    default: process.env.MerchantKey
  },

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
  },
  Payment: {
   //  iremos aceitar apenas cartão de crédito
    Type: {
      type: 'String',
      // default cartão de crédito para todas as operações
      default: 'CreditCard',
      required: true,
    },
    Amount: {
      type: 'Number',
      required: true
    },
    Installments: {
      type: 'Number',
      required: true,
      // default número de parcelas ser apenas 1, não iremos parcelar doação né
      default: 1
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
