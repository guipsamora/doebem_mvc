const angular = require('angular');
const ngRoute = require('angular-route');
const jkAngularCarousel = require('../../../node_modules/angular-jk-carousel/dist/jk-carousel.js');

import routing from './main.routes';

export class MainController {
  $http;
  $scope;
  carouselImages= [];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.$scope = $scope;
    this.carouselImages = [
      { src: "../../assets/images/carousel/img_1.jpg"},
      { src: '../../assets/images/carousel/img_2.jpg' },
      { src: '../../assets/images/carousel/img_3.jpg' }
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
