const angular = require('angular');
const ngRoute = require('angular-route');
const jkAngularCarousel = require('../../../node_modules/angular-jk-carousel/dist/jk-carousel.js');

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

    this.carouselImages = [
      {src: '../../assets/images/carousel/img_1.jpg'},
      {src: '../../assets/images/carousel/img_2.jpg'},
      {src: '../../assets/images/carousel/img_3.jpg'}
    ];

    this.causas = [
      {title: 'Educação', subtitle: '(em breve)', image: '../../assets/images/portfolio/education.jpg', link: '/' },
      {title: 'Saúde', subtitle: '', image: '../../assets/images/portfolio/healthcare.png', link: '/listOngs/saude' },
      {title: 'Combate à Pobreza', subtitle: '(em breve)', image: '../../assets/images/portfolio/poverty.png', link: '/' }
    ];

    this.stepOptions = [
      {
        title: 'CONFIANÇA',
        desc: 'As organizações recomendadas são rigorosamente analisadas com base em impacto, gestão e transparência.',
        icon: 'fa-search'
      },
      {
        title: 'PRATICIDADE',
        desc: 'Você não precisa gastar horas pensando como, quanto ou quem ajudar. \
               Te ajudamos com isso: basta clicar e começar a fazer a diferença!',
        icon: 'fa-check-square-o'
      },
      {
        title: 'ACOMPANHAMENTO',
        desc: 'Transparência é muito importante para nós! Você acompanha o seu impacto positivo no Brasil e \
               recebe novidades sobre a organização que suporta.',
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
 [ngRoute, 'jkAngularCarousel', contactForm])
    .config(routing)
    .component('main', {
      template: require('./main.pug'),
      controller: MainController
    })
    .name;
