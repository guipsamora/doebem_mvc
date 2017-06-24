const angular = require('angular');
const ngRoute = require('angular-route');

import routing from './main.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class MainController {
  $http;
  $scope;
  $location;
  carouselImages= [];
  causas = [];
  stepOptions = [];
  listOngFilters = [];
  listOng = [];
  listOngToDisplay = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.listOng = [];
    this.listOngToDisplay = [];
    this.stepOptions = [
      {
        title: 'Selecione',
        desc: 'Uma organização eficiente.',
        icon: 'fa-hand-pointer-o'
      },
      {
        title: 'Doe',
        desc: 'O valor que quiser.',
        icon: 'fa-money'
      },
      {
        title: 'Acompanhe',
        desc: 'O impacto da sua doação.',
        icon: 'fa-envelope-o'
      }
    ];
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

export default angular.module('doebemOrgApp.main',
 [ngRoute, contactForm])
    .config(routing)
    .component('main', {
      template: require('./main.pug'),
      controller: MainController
    })
    .name;
