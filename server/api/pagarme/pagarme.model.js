'use strict';

import mongoose from 'mongoose';

var pagarmeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  object: String,
  status: String,
  refuse_reason: String,
  status_reason: String,
  acquirer_response_code: String,
  acquirer_name: String,
  acquirer_id: String,
  authorization_code: String,
  soft_descriptor: String,
  tid: Number,
  nsu: Number,
  date_created: String,
  date_updated: String,
  amount: Number,
  authorized_amount: Number,
  paid_amount: Number,
  refunded_amount: Number,
  installments: Number,
  id: Number,
  cost: Number,
  card_holder_name: String,
  card_last_digits: String,
  card_first_digits: String,
  card_brand: String,
  card_pin_mode: String,
  postback_url: String,
  payment_method: String,
  capture_method: String,
  antifraud_score: String,
  boleto_url: String,
  boleto_barcode: String,
  boleto_expiration_date: String,
  referer: String,
  ip: String,
  subscription_id: String,
  phone: String,
  address: String,
  customer: {
    object: String,
    id: Number,
    external_id: String,
    type: String,
    country: String,
    document_number: String,
    document_type: String,
    name: String,
    email: String,
    phone_numbers: [
      String,
      String
    ],
    born_at: String,
    birthday: String,
    gender: String,
    date_created: String,
    documents: [
      {
        object: String,
        id: String,
        type: String,
        number: String
      }
    ]
  },
  billing: {
    address: {
      object: String,
      street: String,
      complementary: String,
      street_number: String,
      neighborhood: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      id: Number
    },
    object: String,
    id: Number,
    name: String
  },
  shipping: {
    address: {
      object: String,
      street: String,
      complementary: String,
      street_number: String,
      neighborhood: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      id: Number
    },
    object: String,
    id: Number,
    name: String,
    fee: Number,
    delivery_date: String,
    expedited: Boolean
  },
  items: [
    {
      object: String,
      id: String,
      title: String,
      unit_price: Number,
      quantity: Number,
      category: String,
      tangible: Boolean,
      venue: String,
      date: String
    },
  ],
  card: {
    object: String,
    id: String,
    date_created: String,
    date_updated: String,
    brand: String,
    holder_name: String,
    first_digits: String,
    last_digits: String,
    country: String,
    fingerprinring: String,
    valid: String,
    expiration_date: String
  },
  split_rules: String,
  metadata: {},
  antifraud_metadata: {},
  reference_key: String
});

export default mongoose.model('pagarmeSchema', pagarmeSchema);
