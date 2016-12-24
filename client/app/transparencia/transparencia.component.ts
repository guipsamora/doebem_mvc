const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './transparencia.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class TransparenciaController {
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
        desc: 'Avaliamos a gestão e processos da organização.',
        icon: 'fa-area-chart'
      },
      {
        title: 'Transparência',
        desc: 'Analisamos a transparência financeira e organizacional.',
        icon: 'fa-file-o'
      },
      {
        title: 'Impacto',
        desc: 'Buscamos evidências claras dos resultados apresentados.',
        icon: 'fa-globe'
      },
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
