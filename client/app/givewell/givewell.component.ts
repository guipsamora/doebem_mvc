const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './givewell.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class GivewellController {
  $http;
  $scope;
  $routeParams;
  stepCriterios = [];
  listOng = [];
  steps = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.stepCriterios = [
      {
        title: 'Impacto',
        desc1: 'Buscamos evidências claras da',
        desc2: 'efetividade do trabalho realizado.',
        icon: 'fa-globe'
      },
      {
        title: 'Gestão',
        desc1: 'Avaliamos a gestão, a equipe e',
        desc2: 'os processos da organização.',
        icon: 'fa-area-chart'
      },
      {
        title: 'Transparência',
        desc1: 'Analisamos a transparência',
        desc2: 'financeira e organizacional.',
        icon: 'fa-file-o'
      }
    ];

    this.steps = {
      step1: "Pesquisamos as intervenções que possuem o maior impacto.",
      step2: "Estudamos a relevância do problema no Brasil.",
      step3: "Buscamos organizações sociais que trabalhem com esses problemas.",
      step4: "Avaliamos as organizações com base no Impacto, Transparência e Gestão.",
      step5: "Caso aprovada, recomendamos a organização em nosso site para recebimento de doações.",
    };
  }

  carregaLista() {
    this.$http.get(`api/ong/`)
      .then(res => {
        this.listOng = res.data;
      });
  }

  $onInit() {
    this.carregaLista();
  }  
}

export default angular.module('doebemOrgApp.givewell', [ngRoute, contactForm])
  .filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
  }])
  .config(routing).component('givewell', {template: require('./givewell.pug'),
  controller: GivewellController
})
.name;
