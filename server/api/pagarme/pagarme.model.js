'use strict';

import mongoose from 'mongoose';

var pagarmeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }
});

export default mongoose.model('pagarme', pagarmeSchema);
