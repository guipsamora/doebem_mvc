'use strict';

import mongoose from 'mongoose';

var checkoutFormSchema = new mongoose.Schema({
  
  //  "MerchantOrderId":"2014111703",
   "Customer": {
      "Name": {
        type: 'String',
        required: true,
      },
      "Email": {
        type: 'String',
        required: true,
      },
      "CPF": {
        type: 'String',
        required: true,
      },
      "Cidade": {
        type: 'String',
        required: true,
      }
   }
  //  ,
  //  "Payment": {
     
  //    "Type": {
  //       type: 'String',
  //       required: true
  //    },
     
  //    "Amount": {
  //       type: 'Number',
  //       required: true
  //    },
     
  //    "Installments": {
  //       type: 'Number',
  //       required: true
  //    },
  
  //    "CreditCard": {
  //        "CardNumber": {
  //           type: 'String',
  //           required: true
  //        },
         
  //        "ExpirationDate": {
  //           type: 'String',
  //           required: true
  //        },
  //        "SecurityCode": {
  //           type: 'String',
  //           required: true
  //        },
  //        "Brand": {
  //       type: 'String',
  //       required: true
  //     }
  //    }
  //  }  


  
  
  // fistName: String,
  // lastName: String,
  // email: String,
  // message: String,
  // date: { type: Date, default: Date.now }
});

export default mongoose.model('checkoutForm', checkoutFormSchema);
