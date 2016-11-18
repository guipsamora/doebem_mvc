const angular=require('angular');
const ngRoute=require('angular-route');
import routing from './list-ongs.routes';
export class ListOngsController {
  $http;
  $scope;
  $routeParams;
  stepOptions=[];
  listOngFilters=[];
  listOng=[];
  pageTitle;
  pageImage;
  listOngToDisplay = [];
  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http=$http;
    this.$scope=$scope;
    this.$routeParams=$routeParams;
    this.pageTitle;
    this.pageImage;
    this.listOngToDisplay;

    this.listOng=[ {
      nome: 'Exemplo 1', areaDeAtuacao: 'Educacao', desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png', localidades: 'Rio de Janeiro'
    }
    ,
    {
      nome: 'Exemplo 2', areaDeAtuacao: 'Saude', desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png', localidades: 'São Paulo'
    }
    ,
    {
      nome: 'Exemplo 3', areaDeAtuacao: 'CombateAPobreza', desc: 'Bla Bla Bla Bla Bla Bla', logo: '../../assets/images/educacao/gauss/logo-gauss.png', localidades: 'Rio de Janeiro - São Paulo'
    }
    ]; 

   
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
     this.setPageFilter()
  }

  setPageFilter() {
    switch(this.$routeParams.filterCausa) {

      case 'saude':
        this.pageTitle='Saúde';
        this.pageImage='./assets/images/saude/2.png';
         this.listOngFilterToDisplay()
        break;
      case 'combateAPobreza': 
        this.pageTitle='Combate a Pobreza';
        this.pageImage='./assets/images/combate_pobreza/1.png';
        this.listOngFilterToDisplay()
        break;
      case 'educacao': 
        this.pageTitle='Educação';
        this.pageImage='./assets/images/educacao/lousa_edu3.jpg';
        this.listOngFilterToDisplay()
        break;
      default: 
        this.pageTitle='Ongs que apoiamos';
        this.pageImage='./assets/images/educacao/lousa_edu3.jpg';
        this.listOngToDisplay = this.listOng;
    }
  }

  listOngFilterToDisplay() {
    this.listOng.map(ong => {
      if (ong.areaDeAtuacao === this.$routeParams.filterCausa){
          this.listOngToDisplay.push(ong);
      }
    })
  }

}

export default angular.module('doebemOrgApp.listOngs', [ ngRoute]) .config(routing) .component('listOngs', {
  template: require('./list-ongs.pug'), controller: ListOngsController
}) 
.name;
