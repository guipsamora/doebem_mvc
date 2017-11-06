'use strict';

import mongoose from 'mongoose';

const OngSchema = new mongoose.Schema({
  nomeFantasia: {
    type: 'String',
  },
  razaoSocial: {
    type: 'String',
  },
  cnpj: {
    type: 'String',
  },
  anoFundacao: {
    type: 'String',
  },
  telefone: {
    type: 'String',
  },
  email: {
    type: 'String',
  },
  urlSite: {
    type: 'String',
  },
  slug: {
    type: 'String',
  },
  logradouro: {
    type: 'String',
  },
  num: {
    type: 'String',
  },
  cidade: {
    type: 'String',
  },
  estado: {
    type: 'String',
  },
  cep: {
    type: 'String',
  },
  logo: {
    type: 'String',
  },
  backgroundImage: {
    type: 'String',
  },
  imagens: [{
    imagem: {
      type: 'String',
    }
  }],
  causa: {
    type: 'String',
  },
  causaFrontEnd: {
    type: 'String',
  },
  localidadesDeAtuacao: [{
    localidade: {
      type: 'String',
    }
  }],
  desc: {
    type: 'String',
  },
  sobre: {
    type: 'String',
  },
  analiseGestao: {
    type: 'String',
  },
  analiseTransparencia: {
    type: 'String',
  },
  analiseImpacto: {
    type: 'String',
  },
  linkPdf: {
    type: 'String',
  },
  linkPaypal: {
    type: 'String',
  },
  videoYoutube: {
    type: 'String',
  },
  papers: [{
    name: {
      type: 'String',
    },
    link: {
      type: 'String',
    }
  }],
  atuacao: {
    type: 'String',
  },
  givewell: {
    type: 'Boolean',
  },
  disclaimer: {
    type: 'String',
  },
  faz: {
    type: 'String',
  },
  funciona: {
    type: 'String',
  },
  dolar: {
    type: 'String',
  },
  funding: {
    type: 'String',
  },
  recommended: {
    type: 'String',
  },
});


export default mongoose.model('ong', OngSchema);
