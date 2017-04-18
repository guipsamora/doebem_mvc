const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './metodologia.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class MetodologiaController {
  $http;
  $scope;
  $routeParams;
  stepCriterios = [ ];

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.stepCriterios = [
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
      },
      {
        title: 'Impacto',
        desc1: 'Buscamos evidências claras da',
        desc2: 'efetividade do trabalho realizado.',
        icon: 'fa-globe'
      },
    ];
  }

  $onInit() {
  }
}

export default angular.module('doebemOrgApp.metodologia', [ngRoute, contactForm])
  .config(routing).component('metodologia', {template: require('./metodologia.pug'),
  controller: MetodologiaController
})
.name;
