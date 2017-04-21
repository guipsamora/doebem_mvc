'use strict';

import mongoose from 'mongoose';

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
