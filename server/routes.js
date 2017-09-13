/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import pagarme from 'pagarme';

export default app => {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/contactForm', require('./api/contactForm'));
  app.use('/api/newsletter', require('./api/newsletter'));
<<<<<<< HEAD
  app.use('/api/ong', require('./api/ong'));
  app.use('/api/buscaCep', require('./api/busca-cep'));
  app.use('/api/imageGallery', require('./api/imageGallery'));
=======
  app.use('/api/pagarme', require('./api/pagarme'));
  app.use('/api/ong', require('./api/ong'));
  app.use('/api/buscaCep', require('./api/busca-cep'));
  app.use('/api/imageGallery', require('./api/imageGallery'));

>>>>>>> pagarme
  app.use('/auth', require('./auth').default);



  // All undefined asset or API routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  app.post('/pagOngs/*', function(req, res){

    console.log("Post 'pagOngs' chamado", req.body);

    var token = req.body.token;
    var amountTransaction = req.body.amount;

    pagarme.client.connect({ api_key: 'ak_test_rnrtxW0T417zXA5Fq42gM2LBaqLrFq' })
    .then(client => client.transactions.capture({ id: token, amount: amountTransaction }))
    .catch(err => {console.log(err.response.errors)});
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
};
