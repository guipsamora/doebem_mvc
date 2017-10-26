const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './metodologia.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class MetodologiaController {
  $http;
  $scope;
  $routeParams;
  stepCriterios = [ ];
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
      // step1: "<a href=\"https://www.givewell.org\" target=\"_blank\">GiveWell</a>",
      step1: "Pesquisamos as intervenções que possuem o maior impacto.",
      step2: "Estudamos a situação do problema no Brasil.",
      step3: "Buscamos organizações sociais que trabalhem com esses problemas.",
      step4: "Avaliamos as organizações com base no Impacto, Transparência e Gestão.",
      step5: "Caso aprovada, recomendamos a organização em nosso site para recebimento de doações.",
    };
  }

  $onInit() {
  };
}

export default angular.module('doebemOrgApp.metodologia', [ngRoute, contactForm])
  .filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
  }])
  .config(routing).component('metodologia', {template: require('./metodologia.pug'),
  controller: MetodologiaController
})
.name;
