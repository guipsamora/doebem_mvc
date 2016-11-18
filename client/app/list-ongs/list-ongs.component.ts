const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './list-ongs.routes';

export class ListOngsController {
  $http;
  $scope;
  stepOptions = [];
  listOngFilters = [];
  listOng = [];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.$scope = $scope;

    
    this.listOng= [
      {nome: 'Exemplo 1', AreaDeAtuação: 'educação' , desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png'},
      {nome: 'Exemplo 2', AreaDeAtuação: 'educação' , desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png'},
      {nome: 'Exemplo 3', AreaDeAtuação: 'educação' , desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png'} 
    ]


    this.listOngFilters = [{
      title: 'Educação',
      image: './assets/images/educacao/lousa_edu3.jpg'
      }
      ]   
  }

  $onInit() {
    
  }

  setPageFilter() {
    
  }


}

export default angular.module('doebemOrgApp.listOngs', [
  ngRoute])
    .config(routing)
    .component('listOngs', {
      template: require('./list-ongs.pug'),
      controller: ListOngsController
    })
    .name;
