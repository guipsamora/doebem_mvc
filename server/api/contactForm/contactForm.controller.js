/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /api/ContactForm              ->  create

 */
'use strict';
import ContactForm from './contactForm.model';
import express from 'express';
import mailer from 'express-mailer';

var app = express();

// console.log("eu funcionei");

mailer.extend(app, {
  from: 'doebembr@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.GOOGLE_ID,
    pass: process.env.GOOGLE_SECRET
  }
});

app.set('views', `${__dirname}/`);//path.resolve( __dirname, '/'));
app.set('view engine', 'pug');

function handleSendEmail(req, res) {
  app.mailer.send({
    template: 'email',
    bcc: 'doebembr@gmail.com'
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
  // console.log(res);
  return ContactForm.create(req.body)
    .then(handleSendEmail(req, res));
    // .then(console.log(res.Email));
}
