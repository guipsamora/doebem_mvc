/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /api/ContactForm              ->  create

 */
'use strict';
import ContactForm from './contactForm.model';
import express from 'express';
import mailer from 'express-mailer';

var app = express();

mailer.extend(app, {
  from: 'doebem <contato@doebem.org.br>',
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

function handleSendEmail(req, res) {
  app.mailer.send({
    template: 'email',
    bcc: 'contato@doebem.org.br'
  },
    {
      to: req.body.Email,
      subject: 'Sua mensagem para a doebem', // REQUIRED.
      message: req.body.Mensagem
    }, err => {
      if(err) {
        // handle error
        console.log(err);

        res.send('Ocorreu um erro ao enviar sua mensagem');
        return;
      }
      res.send('Email enviado');
    });
}

// Creates a new ContactForm in the DB
export function create(req, res) {
  return ContactForm.create(req.body)
    .then(handleSendEmail(req, res));
}
