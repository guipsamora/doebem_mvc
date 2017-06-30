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
        title: 'Confiança',
        desc: 'As organizações recomendadas são rigorosamente analisadas com base em impacto, gestão e transparência.',
        // icon: 'fa-search'
        icon: '../../assets/images/main/icone1.png'
      },
      {
        title: 'Praticidade',
        desc: 'Você não precisa gastar horas pensando como, quanto ou quem ajudar. \
               Te ajudamos com isso: basta clicar e começar a fazer a diferença!',
        // icon: 'fa-check-square-o',
        icon: '../../assets/images/main/icone2.png'
      },
      {
        title: 'Acompanhamento',
        desc: 'Transparência é muito importante para nós! Você acompanha o seu impacto positivo no Brasil e \
               recebe novidades sobre a organização que suporta.',
        // icon: 'fa-envelope-o'
        icon: '../../assets/images/main/icone3.png'
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
