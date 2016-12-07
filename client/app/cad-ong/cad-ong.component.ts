const angular = require('angular');
const ngRoute = require('angular-route');
const slugifier = require('wb-angular-slugify');

import routing from './cad-ong.routes';

export class CadOngController {
  $http;
  $scope;
  $routeParams;
  states =  [];
  listOng = [];
  listAreas = [];
  listAreasDeAtuacao = [];
  ongForm;
  ong = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;

    this.listAreasDeAtuacao = [
      { abbrev: 'educacao', desc: 'Educação' },
      { abbrev: 'saude', desc: 'Saúde' },
      { abbrev: 'combateAProbreza', desc: 'Combate A Probreza' }
    ];
  }

 carregaLista() {
   this.$http.get('api/ong')
      .then(res => {
        this.listOng = res.data;
      });
  }

 buscaEnd(cep) {

   this.$http.get(`/api/BuscaCep/${cep}`)
     .then(res => {
       const end = JSON.parse(res.data.body);
       this.ongForm.logradouro = end.address.split('-')[0];
       this.ongForm.cidade = end.city;
       this.ongForm.estado = end.state;
     })
     .catch(err => console.log(err));
  }

  $onInit() {
    this.carregaLista();
  }

  addOng(ongForm) {
    this.$http.post('api/ong', ongForm)
      .then(res => { console.log(res) });
  }
}

export default angular.module('doebemOrgApp.cadOng', [ngRoute, require('angular-input-masks'), 'slugifier'])
  .config(routing)
  .component('cadOng',{template: require('./cad-ong.pug'), controller: CadOngController})
  .name;
