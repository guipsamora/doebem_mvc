const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './transparencia.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class TransparenciaController {
  $http;
  $scope;
  $routeParams;
  $window;
  stepCriterios = [ ];
  financials = [ ];
  plans = [ ];


  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $window) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$window = $window;
    this.financials = [
      {
        date: '2015',
        dre_name: 'DRE 2015',
        dre_link: 'http://www.uol.com.br',
        balanco_name: 'Balançoa',
        balanco_link: 'http://www.uol.com.br',
      },
      {
        date: '2016',
        dre_name: 'DRE 2016',
        dre_link: 'http://www.uol.com.br',
        balanco_name: 'Balançø patrimonial',
        balanco_link: 'http://www.uol.com.br',   
      }
    ];

    this.plans = [
      {
        date: '2015',
        goals_name: 'DRE 2015',
        goals_link: 'http://www.uol.com.br',
        metrics_name: ',
        metrics_link: 'http://www.uol.com.br',
      },
      {
        date: '2015',
        goals_name: '' 2015',
        goals_link: 'http://www.uol.com.br',
        metrics_name: ',
        metrics_link: 'http://www.uol.com.br', 
      }
    ];

  }

  $onInit() {
  }
}

export default angular.module('doebemOrgApp.transparencia', [ngRoute, contactForm])
  .config(routing).component('transparencia', {template: require('./transparencia.pug'),
  controller: TransparenciaController
})
.name;
