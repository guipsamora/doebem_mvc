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
  learnings = [ ];


  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $window) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$window = $window;
    this.financials = [
      // {
      //   date: '2016',
      //   dre_name: 'DRE 2016',
      //   dre_link: '',
      //   balanco_name: 'Balanço patrimonial',
      //   balanco_link: '',
      // },
      // {
      //   date: '2016',
      //   dre_name: 'DRE 2016',
      //   dre_link: '',
      //   balanco_name: 'Balanço patrimonial',
      //   balanco_link: '',
      // }
      // {
      //   date: '2017',
      //   dre_name: 'DRE 2017 (A partir de Maio/17)',
      //   dre_link: '/',
      //   balanco_name: 'Balanço patrimonial (A partir de Maio/17)',
      //   balanco_link: '/',
      // },
      {
        date: '2017',
        dre_name: 'Custos de Lançamento',
        dre_link: 'https://drive.google.com/file/d/0B92Dg4kwqibxbUNhcjN4a0ZlSWM/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      }

    ];

    this.plans = [
      {
        date: '2017',
        goals_name: 'Metas 2017',
        goals_link: 'https://drive.google.com/file/d/0B92Dg4kwqibxSVd6YTY2T1FBWnc/view?usp=sharing',
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

    this.learnings = [
      {
        date: '2017',
        name: '1º Trimestre - 2017',
        link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlUHFJQXhOVFg4bkE/view?usp=sharing',
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
