/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

const clientPath = 'client';

export default app => {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/contactForm', require('./api/contactForm'));
  app.use('/api/newsletter', require('./api/newsletter'));
  app.use('/api/ong', require('./api/ong'));
  app.use('/api/buscaCep', require('./api/busca-cep'));
  app.use('/api/imageGallery', require('./api/imageGallery'));

  // Pagar.me call
  app.use('/api/pagarme', require('./api/pagarme'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or API routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });

  // Sitemap route
  // app.state('sitemap.xml', {url: '/sitemap.xml'});

  // Sitemap route II
  app.route('/sitemap.xml')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get(clientPath)}/sitemap.xml`));
    });
};
