/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /api/Pagarme              ->  create
 * 
 * Documentation pagar.me
 * https://docs.pagar.me/reference
 * https://docs.pagar.me/v2017-07-17/docs/overview-checkout
 * https://docs.pagar.me/v2017-07-17/docs/criando-uma-assinatura
 * 


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
    bcc: 'contato@doebem.org.br',
  },
  {
    to: result.customer.email,
    subject: 'Obrigado por sua doação', // REQUIRED.
    amount: result.amount / 100,
    nome: result.customer.name.split(' ')[0],
    from: 'doebem 💙 <contato@doebem.org.br>',
  }, 
  err => {
    if(err) {
      // handle error
      console.log(err);
      res.send('Ocorreu um erro ao enviar sua mensagem');
      return;
    };
    // res.send("OK");
  });
}

// TRANSACAO UNICA
function handleSendEmailDoebemUnica(result, res) {
  app.mailer.send({
    template: 'emaildoebem',
  },
  {
    to: 'g9m1y7l6p2r0k6d2@doebem.slack.com',
    subject: 'Dados doação concluída', // REQUIRED.
    amount: result.amount / 100,
    nome: result.customer.name,
    from: 'doebem 💙 <contato@doebem.org.br>',
    org: result.org,
    periodicidade: result.metadata.periodo,
    message: result.metadata.message,
    link: result.boleto_url,
    email: result.customer.email,
    dezPorcento: result.metadata.doebem,
    periodo: result.metadata.periodo,
  }, 
  err => {
    if(err) {
      // handle error
      console.log(err);
      res.send('Ocorreu um erro ao enviar sua mensagem');
      return;
    }
    res.send("OK");
  });
}

// TRANSACAO MENSAL - RECORRENCIA
function handleSendEmailDoebemMensal(result, res) {
  app.mailer.send({
    template: 'emaildoebem',
  },
  {
    to: 'g9m1y7l6p2r0k6d2@doebem.slack.com',
    subject: 'Dados doação concluída', // REQUIRED.
    amount: result.metadata.amount / 100,
    nome: result.customer.name,
    from: 'doebem 💙 <contato@doebem.org.br>',
    org: result.metadata.org,
    periodicidade: result.metadata.periodo,
    message: result.metadata.message,
    link: result.boleto_url,
    email: result.customer.email,
    dezPorcento: result.metadata.doebem,
    periodo: result.metadata.periodo,
  }, 
  err => {
    if(err) {
      // handle error
      console.log(err);
      res.send('Ocorreu um erro ao enviar sua mensagem');
      return;
    }
    res.send("OK");
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
    from: 'doebem 💙 <contato@doebem.org.br>',
    nome: result.customer.name.split(' ')[0],
  }, 
  err => {
    if(err) {
      // handle error
      console.log(err);
      res.send('Ocorreu um erro ao enviar o email com boleto');
      return;
    }
    res.send("OK");
  });
}

function sendErro(result, res) {
  app.mailer.send({
    template: 'erro',
    bcc: 'contato@doebem.org.br'
  },
  {
    to: result.customer.email,
    subject: 'Erro em sua doação pela doebem :(', // REQUIRED.
    link: result.boleto_url,
    from: 'doebem 💙 <contato@doebem.org.br>',
  }, 
  err => {
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
  return Pagarme.create(req);
}

export function postPagarme(req, res) {

  // TRANSACTIONS BY BOLETO
  if (req.body.payment_method == 'boleto' && req.body.periodo == 'Unica') {
    pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
      .then(client => client.transactions.create({
        amount: req.body.amount,
        payment_method: req.body.payment_method,
        postback_url: 'http://requestb.in/pkt7pgpk',
        document_number: req.body.customer.document_number,
        customer: {
          name: req.body.customer.name,
          document_number: req.body.customer.document_number,
          email: req.body.customer.email,
          address: {
            zipcode: req.body.customer.address.zipcode,
            street: req.body.customer.address.street,
            street_number: req.body.customer.address.street_number,
            complementary: req.body.customer.address.complementary,
            neighborhood: req.body.customer.address.neighborhood,
            city: req.body.customer.address.street.city,
            state: req.body.customer.address.street.state
          }
        },
        metadata: {
          org: req.body.org,
          periodo: req.body.periodo,
          doebem: req.body.doebem,
          message: req.body.message
        }
      })
      .then(result => {
        client.result.capture;
        // client.transactions.capture;
        // client.transaction.capture;
        console.log(result);
        sendBoleto(result, res);
        handleSendEmailDoebemUnica(result, res);
        Pagarme.create(result);
      }))
  } else if (req.body.payment_method == 'boleto' && req.body.periodo == 'Mensal') {
    pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
    .then(client => client.plans.create({
      amount: req.body.amount,
      days: 30,
      name: 'Plano - ' + req.body.customer.name,
      payments_methods: ['boleto', 'credit_card']
    }))
    .then(plan => {
      pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
        .then(client => client.subscriptions.create({
            payment_method: req.body.payment_method,
            customer: {
              name: req.body.customer.name,
              document_number: req.body.customer.document_number,
              email: req.body.customer.email,
              address: {
                zipcode: req.body.customer.address.zipcode,
                street: req.body.customer.address.street,
                street_number: req.body.customer.address.street_number,
                complementary: req.body.customer.address.complementary,
                neighborhood: req.body.customer.address.neighborhood,
                city: req.body.customer.address.street.city,
                state: req.body.customer.address.street.state
              }
            },
            pĺan_id: plan.id,
            charges: null,
            metadata: {
              org: req.body.org,
              periodo: req.body.periodo,
              doebem: req.body.doebem,
              message: req.body.message
            }
        }))
        .then(result => {
            console.log("Subscription created successfully");
            console.log(result);
            handleSendEmailDoebemMensal(result, res);
            sendBoleto(result, res);
            Pagarme.create(result);
            // COMO MANDAR O BOLETO MENSALMENTE??
            // MANDAR EMAILS DE SUCESSO
        })
        .catch(error => {
            console.log(error);
            // MANDAR MENSAGENS DE FRACASSO
        });
    })
  // TRANSACTIONS BY CREDIT CARD
  } else if (req.body.payment_method === 'credit_card' && req.body.periodo === 'Unica') {
      console.log("Entrei em 'credit_card' && 'Unica' ")
      pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
        .then(client => client.transactions.create({
          card_hash: req.body.card_hash,
          amount: req.body.amount,
          payment_method: req.body.payment_method,
          postback_url: 'http://requestb.in/pkt7pgpk',
          document_number: req.body.customer.document_number,
          customer: {
            name: req.body.customer.name,
            document_number: req.body.customer.document_number,
            email: req.body.customer.email,
            address: {
              zipcode: req.body.customer.address.zipcode,
              street: req.body.customer.address.street,
              street_number: req.body.customer.address.street_number,
              complementary: req.body.customer.address.complementary,
              neighborhood: req.body.customer.address.neighborhood,
              city: req.body.customer.address.street.city,
              state: req.body.customer.address.street.state
            }
          },
          metadata: {
            org: req.body.org,
            periodo: req.body.periodo,
            doebem: req.body.doebem,
            message: req.body.message,
            amount: plan.amount
          }
        }))
        .then(transaction => {
          console.log(transaction);
          handleSendEmail(transaction, res);
          handleSendEmailDoebemUnica(transaction, res);
          client.transaction.capture;
          Pagarme.create(transaction);
        })
        .catch(err => {
          console.log(err.response.errors);
        });
  } else if (req.body.payment_method === 'credit_card' && req.body.periodo === 'Mensal') {
    console.log("Entrei em 'credit_card' && 'Mensal' ")
      pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
        .then(client => client.plans.create({
          amount: req.body.amount,
          days: 30,
          name: 'Plano - ' + req.body.customer.name,
          payments_methods: ['boleto', 'credit_card']
        }))
        .then(plan => {
          console.log(plan);
          console.log('\n\n');
          console.log("Esse é o req body");
          console.log(req.body)
          console.log('\n\n');
          pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
            .then(client => client.subscriptions.create({
                payment_method: req.body.payment_method,
                card_hash: req.body.card_hash,
                customer: {
                  name: req.body.customer.name,
                  document_number: req.body.customer.document_number,
                  email: req.body.customer.email,
                  address: {
                    zipcode: req.body.customer.address.zipcode,
                    street: req.body.customer.address.street,
                    street_number: req.body.customer.address.street_number,
                    complementary: req.body.customer.address.complementary,
                    neighborhood: req.body.customer.address.neighborhood,
                    city: req.body.customer.address.street.city,
                    state: req.body.customer.address.street.state
                  },
                  phone: {
                    ddd: req.body.customer.phone.ddd,
                    number: req.body.customer.phone.number
                  }
                },
                pĺan_id: plan.id,
                charges: null,
                metadata: {
                  org: req.body.org,
                  periodo: req.body.periodo,
                  doebem: req.body.doebem,
                  message: req.body.message,
                  name_plan: plan.name,
                  amount: plan.amount
                }
            }))
            .then(result => {
              // client.subscriptions.capture;
              console.log("Subscription created");                
              console.log(result);
              handleSendEmail(result, res);
              handleSendEmailDoebemMensal(result, res);
              Pagarme.create(result);
              // COMO MANDAR O BOLETO MENSALMENTE??
              // FAZER MENSAGEM DE DOAÇÃO MENSAL??
            })
            .catch(error => {
                console.log("deu erro");
                console.log(JSON.stringify(error));
            });
      })
  }
}


