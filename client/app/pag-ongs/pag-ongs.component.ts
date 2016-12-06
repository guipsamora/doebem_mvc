const angular = require('angular');
const ngRoute = require('angular-route');
const jkAngularCarousel = require('../../../node_modules/angular-jk-carousel/dist/jk-carousel.js');
import routing from './pag-ongs.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class PagOngs {
  $http;
  $scope;
  $routeParams;
  stepOptions = [];
  pageTitle;
  pageImage;
  infoOng;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.pageTitle;
    this.pageImage;
    this.infoOng;



    
}

  carregaLista() {
    this.$http.get('api/ong/:id')
      .then(res => {
          this.infoOng = res.data;
      });
  }

  $onInit() {
     
  }

}

export default angular.module('doebemOrgApp.pagOngs', [ngRoute, 'jkAngularCarousel', contactForm]) 
  .config(routing) 
  .component('pagOngs', {template: require('./pag-ongs.pug'), controller: PagOngs})
  .name;