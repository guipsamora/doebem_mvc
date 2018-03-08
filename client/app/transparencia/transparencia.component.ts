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
        month: 'Dezembro',
        dre_name: 'Balanço - Dezembro - 2017',
        dre_link: 'https://drive.google.com/file/d/14sTdapEsxfRCKNHDME77Lfe5XZ9U4Xb4/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Novembro',
        dre_name: 'Balanço - Novembro - 2017',
        dre_link: 'https://drive.google.com/file/d/16IzuSIqDc9rj3jW1_sQ7kgfDprIxu5Fy/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Outubro',
        dre_name: 'Balanço - Outubro - 2017',
        dre_link: 'https://drive.google.com/file/d/1QhU7z1D9dtxCwjbCWZ5cBWwId6ytujda/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Setembro',
        dre_name: 'Balanço - Setembro - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlOXM0ZzFKeFZaR0k/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Agosto',
        dre_name: 'Balanço - Agosto - 2017',
        dre_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlaHpSejI1UjIyQTg/view?usp=sharing',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
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
        date: '2018',
        month: 'Março',
        org_name: 'Renovatio',
        transf_link: 'https://drive.google.com/file/d/1Tq83xgk9JH9BWZGGKTis7f4fZq65EdVX/view?usp=sharing'
      },
      {
        date: '2018',
        month: 'Maço',
        org_name: 'Saúde Criança',
        transf_link: 'https://drive.google.com/file/d/1TZafM3eEyJ94KpGUHLE3adZbQWxpCfRM/view?usp=sharing'
      },      
      {
        date: '2017',
        month: 'Outubro',
        org_name: 'Renovatio',
        transf_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXldTNXRGY0MEtRMW8/view?usp=sharing'
      },
      {
        date: '2017',
        month: 'Outubro',
        org_name: 'Saúde Criança',
        transf_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlZmEwcm5EYWlZQTg/view?usp=sharing'
      },
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
        goals_name: 'Metas 2017 - 4º Trimestre',
        goals_link: 'https://drive.google.com/file/d/1o7ZXCsfR1RtpO8c5Fsz5nBRMaHbsS0sb/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
      },      
      {
        date: '2017',
        goals_name: 'Metas 2017 - 3º Trimestre',
        goals_link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlUG1JZ2lPVU4yS00/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
      },
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
        name: '4º Trimestre - 2017',
        link: 'https://drive.google.com/file/d/1McKl1tmia21sasdlWL9Sr-p8Q0LmyaHf/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
      },      
      {
        date: '2017',
        name: '3º Trimestre - 2017',
        link: 'https://drive.google.com/file/d/0B3sdXeGKoeXlRzBGV1h5S0xSdXM/view?usp=sharing',
        metrics_name: '',
        metrics_link: '',
      },
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
