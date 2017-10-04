/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /api/Pagarme              ->  create

 */
'use strict';
import Pagarme from './pagarme.model';
import express from 'express';
import mailer from 'express-mailer';
const pagarme = require('pagarme');

var app = express();

mailer.extend(app, {
  from: 'doebem 💙 <contato@doebem.org.br>',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_SECRET
  }
});

app.set('views', `${__dirname}/`);//path.resolve( __dirname, '/'));
app.set('view engine', 'pug');

function handleSendEmail(result, res) {
  app.mailer.send({
    template: 'email',
    bcc: 'contato@doebem.org.br'
  },
    {
      to: result.customer.email,
      subject: 'Obrigado por sua doação', // REQUIRED.
      amount: result.amount / 100,
      nome: result.customer.name,
    }, err => {
      if(err) {
        // handle error
        console.log(err);

        res.send('Ocorreu um erro ao enviar sua mensagem');
        return;
      }
      res.send(result);
    });
}

function sendBoleto(result, res) {
  app.mailer.send({
    template: 'boleto',
    bcc: 'contato@doebem.org.br'
  },
    {
      to: result.customer.email,
      subject: 'Obrigado por sua doação - Segue boleto', // REQUIRED.
      link: result.boleto_url,
    }, err => {
      if(err) {
        // handle error
        console.log(err);
        res.send('Ocorreu um erro ao enviar sua mensagem');
        return;
      }
      res.send(result);
    });
}

function sendErro(result, res) {
  app.mailer.send({
    template: 'erro',
    bcc: 'contato@doebem.org.br'
  },
    {
      to: result.customer.email,
      subject: 'Boleto - doação doebem', // REQUIRED.
      link: result.boleto_url,
    }, err => {
      if(err) {
        // handle error
        console.log(err);
        res.send('Ocorreu um erro ao enviar sua mensagem');
        return;
      }
      res.send(result);
    });
}

// Creates a new Pagarme in the DB
export function create(req) {
  console.log(req);
  return Pagarme.create(req.body);
}

export function postPagarme(req, res) {
  console.log('postPagarme was called');

  var token = req.body.token;
  var amountTransaction = req.body.amount;

  pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
    .then(client => client.transactions.capture({ id: token, amount: amountTransaction }),
          err => sendErro(err, res))
    .then(result => {
      if(result.payment_method == 'boleto') {
        console.log('É BOLETO');
        sendBoleto(result, res);
      } else {
        handleSendEmail(result, res);
      }
      // Pagarme.create(result);
    })
    .catch(err => {
      console.log(err.response.errors);
    });
}
