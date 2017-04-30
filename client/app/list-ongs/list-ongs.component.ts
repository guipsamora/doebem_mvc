const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './list-ongs.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class ListOngsController {
  $http;
  $scope;
  $routeParams;
  stepOptions = [];
  listOngFilters = [];
  listOng = [];
  pageTitle;
  pageImage;
  listOngToDisplay = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.pageTitle = '';
    this.pageImage = '';
    this.listOngToDisplay = [];
    this.listOng = [];

    this.listOngFilters = [
      {
        title: 'Educação',
        image: './assets/images/educacao/lousa_edu3.jpg'
      },
      {
        title: 'CombateAPobreza',
        image: './assets/images/combate_pobreza/1.jpg'
      },
      {
        title: 'Saude',
        image: './assets/images/saude/2.jpg'
      }
    ];

  }

  carregaLista() {
    this.$http.get(`api/ong/`)
        .then(res => {
          this.listOng = res.data;
          this.listOngFilterToDisplay();
          if (this.$routeParams.filterCausa === undefined &&
              this.listOngToDisplay.length === 0) {
                this.listOngToDisplay = this.listOng;
          }
        });
  }

  $onInit() {
    this.setPageFilter();
    this.carregaLista();
  }

  setPageFilter() {
    switch (this.$routeParams.filterCausa) {
      case 'saude':
        this.pageTitle = 'Saúde';
        this.pageImage = './assets/images/saude/2.jpg';
        break;
      case 'combateAPobreza':
        this.pageTitle = 'Combate a Pobreza';
        this.pageImage = './assets/images/combate_pobreza/1.jpg';
        break;
      case 'educacao':
        this.pageTitle = 'Educação';
        this.pageImage = './assets/images/educacao/lousa_edu3.jpg';
        break;
      default:
        this.pageTitle = 'ONGs recomendadas';
        this.pageImage = './assets/images/educacao/lousa_edu3.jpg';
    }
  }

  listOngFilterToDisplay() {
    this.listOng.map(ong => {
      if (ong.causa === this.$routeParams.filterCausa) {
          this.listOngToDisplay.push(ong);
      }
    });
  }
}

export default angular.module('doebemOrgApp.listOngs', [ngRoute, contactForm])
  .config(routing)
  .component('listOngs', {template: require('./list-ongs.pug'), controller: ListOngsController})
  .name;
