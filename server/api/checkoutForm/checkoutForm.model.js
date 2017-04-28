'use strict';

import mongoose from 'mongoose';

const linksSchema = new mongoose.Schema({
  Method: String,
  Rel: String,
  Href: String
});

const creditCardSchema = new mongoose.Schema({
  CardNumber: { type: String, required: true },
  Holder: { type: String },
  ExpirationDate: { type: String, required: true },
  SaveCard: { type: Boolean, required: true },
  Brand: { type: String, required: true }
});

const paymentSchema = new mongoose.Schema({
  Installments: { type: Number, required: true },
  Interest: { type: String, required: true },
  Capture: { type: Boolean, required: true },
  Authenticate: { type: Boolean, required: true },
  CreditCard: creditCardSchema,
  ProofOfSale: { type: String, required: true },
  Tid: { type: String, required: true },
  AuthorizationCode: { type: String, required: true },
  PaymentId: { type: String, required: true },
  Type: { type: String, required: true },
  Amount: { type: Number, required: true },
  Currency: { type: String, required: true },
  Country: { type: String, required: true },
  ExtraDataCollection: [],
  Status: { type: Number, required: true },
  ReturnCode: { type: String, required: true },
  ReturnMessage: { type: String, required: true },
  Links: [linksSchema]
});

const authorResponseSchema = new mongoose.Schema({
  MerchantOrderId: { type: String, required: true },
  Customer: {
    Name: { type: String, required: true }
  },
  Payment: paymentSchema,
});

const captureResponseSchema = new mongoose.Schema({
  Status: { type: Number, required: true },
  ReturnCode: { type: String, required: true },
  ReturnMessage: { type: String, required: true },
  Links: [linksSchema]
});

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  cidade: { type: String, required: true },
  source: { type: String, required: true }
});

const paymentInfoSchema = new mongoose.Schema({
  // default cartão de crédito para todas as operações
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  // default número de parcelas ser apenas 1, não iremos parcelar doação né
  installments: { type: Number, required: true }
});

const transactionSchema = new mongoose.Schema({
  donor: donorSchema,
  paymentInfo: paymentInfoSchema,
});

export default mongoose.model('Transaction', transactionSchema);
