'use strict';

import mongoose from 'mongoose';

var OngSchema = new mongoose.Schema({
      nomeFantasia: String,
      razaoSocial: String,
      end: String,
      cidade: String,
      estado: String,
      areaDeAtuacao: String,
      desc: String,
      logo: String,
      localidadesDeAtuacao: String
});

export default mongoose.model('ong', OngSchema);
