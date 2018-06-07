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
    }
    res.send(result);
  });
}

function handleSendEmailDoebem(result, res) {
  app.mailer.send({
    template: 'emaildoebem',
  },
  {
    to: 'g9m1y7l6p2r0k6d2@doebem.slack.com',
    subject: 'Dados doação concluída', // REQUIRED.
    amount: result.dados.amount / 100,
    nome: result.dados.customer.name,
    from: 'doebem 💙 <contato@doebem.org.br>',
    org: result.dados.donated_to,
    message: result.dados.mensagem,
    link: result.dados.boleto_url,
    email: result.dados.customer.email,
    dezPorcento: result.dados.doebem,
    periodo: result.dados.periodo,
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

  var amountTransaction = req.body.amount;
  var donatedTo = req.body.org;
  var message = req.body.message;
  var dezPorcento = req.body.doebem;
  var periodo = req.body.periodo;

  console.log(req.body.customer);

  if (req.body.payment_method == 'boleto' ) {
    pagarme.client.connect({ api_key: 'ak_test_rnrtxW0T417zXA5Fq42gM2LBaqLrFq' })
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
        metadata:{
            org: "Teste",
            periodo: "Junho",
            doebem: "True",
            message: "Teste"
        }
      })
      .then(transaction => { 
          console.log(transaction);
          res.send("OK");
      }))
  } else if (req.body.payment_method == 'credit_card') {
    pagarme.client.connect({ api_key: 'ak_test_rnrtxW0T417zXA5Fq42gM2LBaqLrFq' })
      .then(client => client.transactions.create({
        card_hash: req.body.card_hash,
        amount: req.body.amount,
        payment_method: req.body.payment_method,
        postback_url: 'http://requestb.in/pkt7pgpk',
        document_number: req.body['customer']['document_number'],
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
        metadata:{
                org: "Teste",
                periodo: "Junho",
                doebem: "True",
                message: "Teste"
        }
      }))
      .then(transaction => {
        console.log(transaction)
        res.send("OK");
          // client.transactions.capture;
      })
      .catch(err => {
        console.log("VEIO PRO CARTÃO \n \n \n")
        console.log('Deu ruim\n');
        console.log(err);
      });
  }
}


  // if (req.body.payment_method == 'boleto' && req.body.periodo == 'Avulsa') {
  //   pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
  //     .then(client => client.transactions.create({
  //       amount: req.body.amount,
  //       payment_method: req.body.payment_method,
  //       postback_url: 'http://requestb.in/pkt7pgpk',
  //       document_number: req.body.customer.document_number,
  //       customer: {
  //           name: req.body.customer.name,
  //           document_number: req.body.customer.document_number,
  //           email: req.body.customer.email,
  //           address: {
  //             zipcode: req.body.customer.address.zipcode,
  //             street: req.body.customer.address.street,
  //             street_number: req.body.customer.address.street_number,
  //             complementary: req.body.customer.address.complementary,
  //             neighborhood: req.body.customer.address.neighborhood,
  //             city: req.body.customer.address.street.city,
  //             state: req.body.customer.address.street.state}
  //       },
  //       org: req.body.org,
  //       periodo: req.body.periodo,
  //       doebem: req.body.doebem,
  //       message: req.body.message
  //     })
  //     .then(transaction => { 
  //       console.log(transaction);
  //       res.send("OK");
  //     })
  //     .then(result => { 
  //         result.donated_to = donatedTo;
  //         result.mensagem = message;
  //         result.doebem = dezPorcento;
  //         result.periodo = periodo
  //         result.dados = req.body;
  //         // sendBoleto(result, res);
  //         // handleSendEmailDoebem(result, res);
  //     }))
  // } else if (req.body.payment_method == 'credit_card' && req.body.periodo == 'Avulsa') {

  //   console.log("It came to cartão parte");

  //   console.log(req.body.card_hash);
  //   console.log(req.body.customer);

  //   pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
  //     .then(client => client.transactions.create({
  //       card_hash: req.body.card_hash,
  //       amount: req.body.amount,
  //       payment_method: req.body.payment_method,
  //       postback_url: 'http://requestb.in/pkt7pgpk',
  //       document_number: req.body['customer']['document_number'],
  //       customer: {
  //           name: req.body.customer.name,
  //           document_number: req.body.customer.document_number,
  //           email: req.body.customer.email,
  //           address: {
  //             zipcode: req.body.customer.address.zipcode,
  //             street: req.body.customer.address.street,
  //             street_number: req.body.customer.address.street_number,
  //             complementary: req.body.customer.address.complementary,
  //             neighborhood: req.body.customer.address.neighborhood,
  //             city: req.body.customer.address.street.city,
  //             state: req.body.customer.address.street.state
  //           }
  //       },
  //       metadata:{
  //         org: req.body.org,
  //         periodo: req.body.periodo,
  //         doebem: req.body.doebem,
  //         message: req.body.message
  //       }
  //     }))
  //     .then(transaction => {
  //       console.log(transaction);
  //       res.send("OK");
  //     })
      // .then(result => { 
      //     result.donated_to = donatedTo;
      //     result.mensagem = message;
      //     result.doebem = dezPorcento;
      //     result.periodo = periodo
      //     result.dados = req.body;
      //     console.log(result);
      //     // client.transactions.capture;
      //     handleSendEmail(result, res);
      //     handleSendEmailDoebem(result, res);
          
      // })
      // .catch(err => {
      //   console.log(err.response.errors);
      // });

  // end of the if clause
  // }
  // pagarme.client.connect({ api_key: process.env.PagarmeApiKey })
  //   // .then(
  //   //       // result => console.log(result),
  //   //       // client => client.transactions.capture({ id: token, amount: amountTransaction }),
  //   //       // client => console.log(client.transactions),
  //   //       err => sendErro(err, res))
  //   .then(result => { 
  //     result.donated_to = donatedTo;
  //     result.mensagem = message;
  //     result.doebem = dezPorcento;
  //     result.periodo = periodo
  //     result.dados = req.body;

  //     console.log('result é');
  //     console.log(result);

  //     if(result.dados.payment_method == 'boleto') {
  //       console.log('Funções sendBoleto e handleSendEmailDoebem foram chamadas');
  //       client.transactions.create({
  //         amount: result.dados.amount,
  //         payment_method: 'boleto',
  //         postback_url: 'http://requestb.in/pkt7pgpk',
  //         customer: {
  //             name: result.dados.customer.name,
  //             document_number: result.dados.customer.name,
  //         },
  //       })
  //       sendBoleto(result, res);
  //       handleSendEmailDoebem(result, res);
  //     } else {
  //       handleSendEmail(result, res);
  //       handleSendEmailDoebem(result, res);
  //     }

  //     // create transaction in our DB
  //     Pagarme.create(result);
  //   })
  //   .then(
  //     client => client.transactions.create({
  //       amount: 1000,
  //       payment_method: 'boleto',
  //       postback_url: 'http://requestb.in/pkt7pgpk',
  //       customer: {
  //           name: 'Aardvark Silva',
  //           document_number: '18152564000105',
  //       },
  //     }))
  //   )
  //   .catch(err => {
  //     console.log('Deu ruim\n');
  //     console.log(err.response.errors);
  //   });

  // end of the funcition
// }
