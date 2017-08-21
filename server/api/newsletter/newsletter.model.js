'use strict';

import mongoose from 'mongoose';

var newsletterSchema = new mongoose.Schema({
  Email: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('newsletter', newsletterSchema);
