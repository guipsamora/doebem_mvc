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

  /*@ngInject*/
  constructor($http, $scope, socket, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;

    this.carouselImages = [
      {src: '../../assets/images/carousel/img_1.jpg'},
      {src: '../../assets/images/carousel/img_2.jpg'},
      {src: '../../assets/images/carousel/img_3.jpg'}
    ];

    this.causas = [
      {title: 'Saúde', subtitle:'', image: '../../assets/images/portfolio/healthcare.png', link: '/listOngs/saude' },
      {title: 'Educação', subtitle: '(em breve)',image: '../../assets/images/portfolio/education.jpg', link: '/' }, 
      {title: 'Combate à Pobreza', subtitle: '(em breve)', image: '../../assets/images/portfolio/poverty.png', link: '/' }
    ];

    this.stepOptions = [{
      title: 'Escolha',
      desc: 'A causa que mais se identifica.',
      icon: 'fa-heart-o'
      },
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

  $onInit() {
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
