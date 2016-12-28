const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './transparencia.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class TransparenciaController {
  $http;
  $scope;
  $routeParams;
  stepCriterios = [ ];
  years = [ ];

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.years = [
      {
        y: '2015',
        dre: "www.uol.com.br",
        balanco: "www.uol.com.br"
      },
      {
        y: "2016",
        dre: "www.uol.com.br",
        balanco: "www.uol.com.br"
      }      
    ]

  }

  $onInit() {
  }
}

export default angular.module('doebemOrgApp.transparencia', [ngRoute, contactForm])
  .config(routing).component('transparencia', {template: require('./transparencia.pug'),
  controller: TransparenciaController
})
.name;
