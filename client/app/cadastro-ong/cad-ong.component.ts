const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './cad-ong.routes';

export class CadOngController {
  $http;
  $scope;
  $routeParams;
  listOng = [];
  listAreas = [];
  listAreasDeAtuacao =[];
  ong = {}
  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.listAreasDeAtuacao =[
      {abbrev: 'educacao', desc: 'Educação'},
      {abbrev: 'saude', desc: 'Saúde'},
      {abbrev: 'combateAProbreza', desc: 'Combate A Probreza'}
    ]

  }
  
  carregaLista() {
   this.$http.get('api/ong')
      .then(res => {
        this.listOng = res.data;
      })
  }

  $onInit() {
      this.carregaLista()
      }
  
  addOng(ongForm) {
    this.$http.post('api/ong', ongForm);
  }
}

export default angular.module('doebemOrgApp.cadOng', [ ngRoute]) .config(routing) .component('cadOng', {
  template: require('./cad-ong.pug'), controller: CadOngController
})
.name;
