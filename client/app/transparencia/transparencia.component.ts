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
  transf = [ ];


  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $window) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$window = $window;
    this.financials = [
      {
        date: '2017',
        month: 'Julho',
        dre_name: 'Balanço - Julho - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlMjhSaFh4U19KVXc/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Junho',
        dre_name: 'Balanço - Junho - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlUGtUZGxJOEZmRzg/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Maio',
        dre_name: 'Balanço - Maio - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXleTlfZmd3b0hpNm8/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Abril',
        dre_name: 'Balanço - Abril - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlRU9kamV1NHk5dGs/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Março',
        dre_name: 'Balanço - Março - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXldTlhbWhEMjNMYTQ/view?usp=sharing  ',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },      
      {
        date: '2017',
        month: 'Fevereiro',
        dre_name: 'Balanço - Fevereiro - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlSW0wWF96Z0FzQ2c/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Fevereiro',
        dre_name: 'Custos de Lançamento',
        dre_link: 'https://drive.google.com/file/d/0B92Dg4kwqibxbUNhcjN4a0ZlSWM/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },              
    ];

    this.transf = [
      {
        date: '2017',
        month: 'Junho',
        org_name: 'Saúde Criança',
        transf_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlNUN3dV9uRTJTb3M/view?usp=sharing'
      }
    ];

    this.plans = [
      {
        date: '2017',
        goals_name: 'Metas 2017 - 2º Trimestre',
        goals_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlb2N6S1RlRXpMb2M/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        goals_name: 'Metas 2017 - 1º Trimestre',
        goals_link: 'https://drive.google.com/file/d/0B92Dg4kwqibxSVd6YTY2T1FBWnc/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
      }
    ];

    this.learnings = [
      {
        date: '2017',
        name: '2º Trimestre - 2017',
        link: 'https://drive.google.com/file/d/0B3sdXeGKoeXleW5VNXpDNWdGdzg/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        name: '1º Trimestre - 2017',
        link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlUHFJQXhOVFg4bkE/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
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
