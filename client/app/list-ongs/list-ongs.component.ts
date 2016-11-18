const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './list-ongs.routes';

export class ListOngsController {
  $http;
  $scope;
  $routeParams;
  stepOptions = [];
  listOngFilters = [];
  listOng = [];
  pageTitle;
  pageImage;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams =  $routeParams;
    this.pageTitle;
    this.pageImage;

    
    this.listOng= [
      {nome: 'Exemplo 1', AreaDeAtuação: 'Educação' , desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png'},
      {nome: 'Exemplo 2', AreaDeAtuação: 'Saude' , desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png'},
      {nome: 'Exemplo 3', AreaDeAtuação: 'Combate á Pobreza' , desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png'} 
    ]


    this.listOngFilters = [
      {
        title: 'Educação',
        image: './assets/images/educacao/lousa_edu3.jpg'
      },
      {
        title: 'CombateAPobreza',
        image: './assets/images/combate_pobreza/1.png'
      },
      {
        title: 'Saude',
        image: './assets/images/saude/2.png'
      }
    ]
  }

  $onInit() {
    console.log('rota',  this.$routeParams.filterCausa)
    this.setPageFilter();
  }

  setPageFilter() {
    switch(this.$routeParams.filterCausa) {
      case 'saude':
        this.pageTitle = 'Saúde';
        this.pageImage = './assets/images/saude/2.png';
        break;
      case 'combate_a_probreza':
        this.pageTitle = 'Combate à Pobreza';
        this.pageImage = './assets/images/combate_pobreza/1.png';
        break;
      case 'educacao':
        this.pageTitle = 'Educação';
        this.pageImage = './assets/images/educacao/lousa_edu3.jpg';
        break;
      default:
      this.pageTitle = 'Ongs que apoiamos';
      this.pageImage = './assets/images/educacao/lousa_edu3.jpg';

    }
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
