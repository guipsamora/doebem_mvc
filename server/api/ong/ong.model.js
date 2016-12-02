'use strict';

import mongoose from 'mongoose';
//saudeCrianca
var OngSchema = new mongoose.Schema({
<<<<<<< HEAD
  nomeFantasia: String,
  razaoSocial: String,
  end: String,
  cidade: String,
  estado: String,
  areaDeAtuacao: String,
  desc: String,
  logo: String,
  localidadesDeAtuacao: String,
  backgroundImage: String,
  imagens: [{imagem: String}],
  anoFundacao: String,
  analiseGestao: String,
  analiseTransparencia: String,
  analiseImpacto: String,
  linkPdf: String
=======
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
	imagens: [{imagem:String}],
	anoFundacao: String,
	analiseGestao: String,
	analiseTransparencia: String,
	analiseImpacto: String,
	linkPdf: String
>>>>>>> a76b6bd75073f1294cd37876621fcc7dd4421741
});

export default mongoose.model('ong', OngSchema);
