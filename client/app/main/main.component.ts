const angular = require('angular');
const ngRoute = require('angular-route');
const jkAngularCarousel = require('../../../node_modules/angular-jk-carousel/dist/jk-carousel.js');

import routing from './main.routes';

export class MainController {
  $http;
  $scope;
  carouselImages= [];
  causas = [];
  stepOptions = [];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.$scope = $scope;

    this.carouselImages = [
      { src: "../../assets/images/carousel/img_1.jpg"},
      { src: '../../assets/images/carousel/img_2.jpg' },
      { src: '../../assets/images/carousel/img_3.jpg' }
    ];

    this.causas = [
      {title: 'Educação', image:'../../assets/images/portfolio/education.jpg' },
      {title: 'Saúde', image:'../../assets/images/portfolio/healthcare.png' },
      {title: 'Combate á Pobreza', image:'../../assets/images/portfolio/poverty.png' }
    ];    

    this.stepOptions = [{
      title: 'Escolha',
      desc: 'A causa mais importante e você',
      icon: 'fa-heart-o'
      },
      {
      title: 'Selecione',
      desc: 'Uma ONG efetiva, avaliada por nós',
      icon: 'fa-hand-pointer-o'
      },
      {
      title: 'Doe',
      desc: 'A quantia e pelo período que desejar.',
      icon: 'fa-money'
      },
      {
      title: 'Acompanhe',
      desc: 'As notícias sobre o impacto da sua doação.',
      icon: 'fa-envelope-o'
      }
      ]   
  }

  $onInit() {
    
  }

}

export default angular.module('doebemOrgApp.main', [
  ngRoute, 'jkAngularCarousel'])
    .config(routing)
    .component('main', {
      template: require('./main.pug'),
      controller: MainController
    })
    .name;
