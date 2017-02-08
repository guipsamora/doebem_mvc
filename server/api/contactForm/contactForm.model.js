'use strict';

import mongoose from 'mongoose';

var contactFormSchema = new mongoose.Schema({
  Name: String,
  Telefone: String,
  Email: String,
  Mensagem: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('contactForm', contactFormSchema);
