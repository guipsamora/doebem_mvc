'use strict';

import mongoose from 'mongoose';
//saudeCrianca
var OngSchema = new mongoose.Schema({
  nomeFantasia: String,
  razaoSocial: String,
  cnpj: String,
  telefone: String,
  email: String,
  urlSite: String,
  logradouro: String,
  num: String,
  cidade: String,
  estado: String,
  cep: String,
  causa: String,
  desc: String,
  logo: String,
  slug: String,
  localidadesDeAtuacao: String,
  backgroundImage: String,
  imagens: [{
    imagem: String
  }],
  anoFundacao: String,
  analiseGestao: String,
  analiseTransparencia: String,
  analiseImpacto: String,
  linkPdf: String
});

export default mongoose.model('ong', OngSchema);
