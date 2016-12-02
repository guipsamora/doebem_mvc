'use strict';

import mongoose from 'mongoose';
//saudeCrianca
var OngSchema = new mongoose.Schema({
  nomeFantasia: String,	
  razaoSocial: String,
  end: String,
  cidade: String,
  estado: String,
  areaDeAtuacao: String,
  desc: String,
  logo: String,
  slug: String,
  localidadesDeAtuacao: String,
  backgroundImage: String,
  imagens: [{imagem: String}],
  anoFundacao: String,
  analiseGestao: String,
  analiseTransparencia: String,
  analiseImpacto: String,
  linkPdf: String
});

export default mongoose.model('ong', OngSchema);
