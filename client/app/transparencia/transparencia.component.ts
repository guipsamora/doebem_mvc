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
        date: '2017',
        dre_name: 'DRE 2017',
        dre_link: '',
        balanco_name: 'Balanço patrimonial',
        balanco_link: '',
      }
      // {
      //   date: '2016',
      //   dre_name: 'DRE 2016',
      //   dre_link: '',
      //   balanco_name: 'Balanço patrimonial',
      //   balanco_link: '',
      // }
    ];

    this.plans = [
      {
        date: '2017',
        goals_name: 'Metas 2017',
        goals_link: '',
        metrics_name: '',
        metrics_link: '',
      }
      // {
      //   date: '2015',
      //   goals_name: '2015',
      //   goals_link: '',
      //   metrics_name: '',
      //   metrics_link: '',
      // }
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
