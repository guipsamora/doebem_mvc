'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
const ngRoute = require('angular-route');
const uiBootstrap = require('angular-ui-bootstrap');

require('offline-plugin/runtime').install();

import {routeConfig} from './app.config';
import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import cadOng from './cad-ong/cad-ong.component';
import contactForm from '../components/contact-form/contact-form.component';
import constants from './app.constants';
import duvidas from './duvidas/duvidas.component';
import footer from '../components/footer/footer.component';
import listOngs from './list-ongs/list-ongs.component';
import main from './main/main.component';
import doar from './doar/doar.component';
import metodologia from './metodologia/metodologia.component';
import givewell from './givewell/givewell.component';
import elisa from './elisa/elisa.component';
import navbar from '../components/navbar/navbar.component';
import newsletter from '../components/newsletter/newsletter.component';
import pagOngs from './pag-ongs/pag-ongs.component';
import slugifier from  './cad-ong/cad-ong.component';
import sobre from './sobre/sobre.component';
import socket from '../components/socket/socket.service';
import sucesso from './sucesso/sucesso.component';
import transparencia from './transparencia/transparencia.component';
import util from '../components/util/util.module';

import 'angular-socket-io';
import './app.scss';

angular.module('doebemOrgApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  'btford.socket-io',
  ngRoute,
  uiBootstrap,
  _Auth,
  account,
  admin,
  navbar,
  footer,
  main,
  doar,
  listOngs,
  contactForm,
  newsletter,
  sobre,
  cadOng,
  pagOngs,
  metodologia,
  givewell,
  elisa,
  transparencia,
  duvidas,
  slugifier,
  sucesso,
  constants,
  socket,
  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
    // Scroll to the top of page, when you click in a link and change the page
    $rootScope.$on('$routeChangeSuccess', function(){
     window.scrollTo(0, 0);
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['doebemOrgApp'], {
      strictDi: true
    });
  });
