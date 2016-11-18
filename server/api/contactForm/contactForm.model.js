'use strict';

import mongoose from 'mongoose';

var contactFormSchema = new mongoose.Schema({
  fistName: String,
  lastName: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('contactForm', contactFormSchema);
