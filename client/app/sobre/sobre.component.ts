const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './sobre.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class SobreController {
  $http;
  $scope;
  $routeParams;
  listaPessoas = [ ];

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.listaPessoas = [
      {nome: 'Elisa Mansur',
       img: './assets/images/team/1.jpg',
       twitter: '',
       linkedin: ''
      },
       {nome: 'Guilherme Samora',
       img: './assets/images/team/2.jpg',
       twitter: '',
       linkedin: ''
      },
        {nome: 'Jean P de Rogatis',
        img: './assets/images/team/2.jpg',
       twitter: '',
       linkedin: ''
      }
    ];
  }

  $onInit() {
  }
}

export default angular.module('doebemOrgApp.sobre', [ ngRoute, contactForm]) .config(routing) .component('sobre', {
  template: require('./sobre.pug'), controller: SobreController
})
.name;
