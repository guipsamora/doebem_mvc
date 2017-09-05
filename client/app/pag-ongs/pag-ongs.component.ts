const angular = require('angular');
const ngRoute = require('angular-route');
const ngSanitize = require('angular-sanitize');
import routing from './pag-ongs.routes';
import contactForm from '../../components/contact-form/contact-form.component';

import { Component } from '@angular/core';

// declare const pg_ng_checkout;
declare var pg_ng_checkout: any;

export class PagOngs {
  $http;
  $scope;
  $routeParams;
  stepOptions = [];
  listOng = [];
  pageTitle;
  pageImage;
  infoOng;
  pg_ng_checkout;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.pageTitle = '';
    this.pageImage = '';
    this.infoOng = '';

    $scope.f = function() {
      
      // console.log(pg_ng_checkout);
      pg_ng_checkout.test()
      // new pg_ng_checkout();
    }
  }

  carregaLista() {
    this.$http.get(`api/ong/${this.$routeParams.id}`)
      .then(res => {
        this.infoOng = res.data;
      });
  }

  $onInit() {
    this.carregaLista();
  }



}

export default angular.module('doebemOrgApp.pagOngs', [ngRoute, contactForm, ngSanitize])
  .config(routing)
  .component('pagOngs', { template: require('./pag-ongs.pug'), controller: PagOngs })
  .name;
