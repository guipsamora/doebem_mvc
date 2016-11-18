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
  from: 'Jean Philip de Rogatis <jrogatis@gmail.com>',
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

function handleSendEmail(res) {
  console.log('path', __dirname);
  app.mailer.send({
    template: 'email',
    bcc: 'jrogatis@metaconexao.com.br'
  },
    {
      to: res.email,
      subject: 'Your contact with Jean', // REQUIRED.
      message: res.message
    }, err => {
      if(err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email Sent');
    });
}

// Creates a new ContactForm in the DB
export function create(req, res) {
  return ContactForm.create(req.body)
    .then(handleSendEmail(res));
}
