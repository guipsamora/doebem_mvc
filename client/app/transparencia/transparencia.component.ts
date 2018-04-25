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
        dre_name: 'Balanço - 2017',
        dre_link: '../assets/transparencia/financas/BALANCETE_2017.pdf',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
      {
        date: '2017',
        month: 'Fevereiro',
        dre_name: 'Custos de Lançamento',
        dre_link: '../assets/transparencia/financas/Custos_de_Lançamento.pdf',
        // balanco_name: 'Balanço patrimonial',
        // balanco_link: '',
      },
    ];

    this.transf = [
      {
        date: '2018',
        month: 'Abril',
        org_name: 'Caviver',
        transf_link: '../assets/transparencia/comprovantes/Transf_Caviver_Abr_18.pdf',
      },
      {
        date: '2018',
        month: 'Março',
        org_name: 'Renovatio',
        transf_link: '../assets/transparencia/comprovantes/Transf_Renovatio_Mar_18.pdf',
      },
      {
        date: '2018',
        month: 'Março',
        org_name: 'Saúde Criança',
        transf_link: '../assets/transparencia/comprovantes/Transf_Saude_Criança_Mar_18.pdf',
      },
      {
        date: '2017',
        month: 'Outubro',
        org_name: 'Renovatio',
        transf_link: '../assets/transparencia/comprovantes/Transf_Renovatio_Out_17.pdf',
      },
      {
        date: '2017',
        month: 'Junho',
        org_name: 'Saúde Criança',
        transf_link: '../assets/transparencia/comprovantes/Transf_Saude_Crianca_Jun_17.pdf',
      }
    ];

    this.plans = [
      {
        date: '2017',
        goals_name: 'Metas 2017 - 4º Trimestre',
        goals_link: '../assets/transparencia/planos/Marcos_e_Desafios_Q4_2017.pdf',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        goals_name: 'Metas 2017 - 3º Trimestre',
        goals_link: '../assets/transparencia/planos/Marcos_e_Desafios_Q3_2017.pdf',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        goals_name: 'Metas 2017 - 2º Trimestre',
        goals_link: '../assets/transparencia/planos/Marcos_e_Desafios_Q2_2017.pdf',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        goals_name: 'Metas 2017 - 1º Trimestre',
        goals_link: '../assets/transparencia/planos/Marcos_e_Desafios_Q1_2017.pdf',
        metrics_name: '',
        metrics_link: '',
      }
    ];

    this.learnings = [
      {
        date: '2017',
        name: '4º Trimestre - 2017',
        link: '../assets/transparencia/aprendizados/Erros_e_Aprendizados_Q4_2017.pdf',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        name: '3º Trimestre - 2017',
        link: '../assets/transparencia/aprendizados/Erros_e_Aprendizados_Q3_2017.pdf',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        name: '2º Trimestre - 2017',
        link: '../assets/transparencia/aprendizados/Erros_e_Aprendizados_Q2_2017.pdf',
        metrics_name: '',
        metrics_link: '',
      },
      {
        date: '2017',
        name: '1º Trimestre - 2017',
        link: '../assets/transparencia/aprendizados/Erros_e_Aprendizados_Q1_2017.pdf',
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
