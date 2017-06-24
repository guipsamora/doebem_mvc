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
      // {
      //   title: 'Escolha',
      //   desc: 'A causa que mais se identifica.',
      //   icon: 'fa-heart-o'
      // },
      {
        title: 'CONFIANÇA',
        desc: 'As organizações selecionadas para você pela doebem são rigorosamente analisadas e recomendadas com base em impacto, gestão e transparência.',
        icon: 'fa-search'
      },
      {
        title: 'PRATICIDADE',
        desc: 'Você não precisa gastar horas pensando como, quanto ou quem ajudar. A doebem te ajuda com isso. Basta clicar e começar a fazer a diferença no Brasil!',
        icon: 'fa-check-square-o'
      },
      {
        title: 'ACOMPANHAMENTO',
        desc: 'Transparência é muito importante para nós. Você poderá acompanhar o seu impacto positivo no Brasil e receber novidades sobre a organização que suporta.',
        icon: 'fa-envelope-o'
      }
      ];
  }

  carregaLista() {
  this.$http.get(`api/ong/`)
      .then(res => {
        this.listOng = res.data;
        // console.log(this.listOng);
        // this.listOngFilterToDisplay();
        // if (this.$routeParams.filterCausa === undefined &&
        //     this.listOngToDisplay.length === 0) {
        //       this.listOngToDisplay = this.listOng;
        // }
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
