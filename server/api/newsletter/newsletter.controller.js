/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /api/Newsletter              ->  create

 */
'use strict';
import newsletter from './newsletter.model';
import express from 'express';
import mailer from 'express-mailer';

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

function handleSendEmail(req, res) {
  console.log(req);
  app.mailer.send({
    template: 'email',
    bcc: 'contato@doebem.org.br'
  },
    {
      to: 'contato@doebem.org.br',
      subject: 'Newsletter: Novo inscrito', // REQUIRED.
      message: req.body.Email
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

// Creates a new Newsletter Email in the DB
export function create(req, res) {
  return newsletter.create(req.body)
  .then(handleSendEmail(req, res));
}
