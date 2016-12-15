const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './cad-ong.routes';

export class CadOngController {
  $http;
  $scope;
  $routeParams;
  $mdDialog;
  states =  [];
  listOng = [];
  listAreas = [];
  listAreasDeAtuacao = [];
  ongForm;
  ong = {};
  dialog;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;

    this.listAreasDeAtuacao = [
      { abbrev: 'educacao', desc: 'Educação' },
      { abbrev: 'saude', desc: 'Saúde' },
      { abbrev: 'combateAPobreza', desc: 'Combate à Probreza' }
    ];
  }

  carregaLista() {
   this.$http.get('api/ong')
      .then(res => {
        this.listOng = res.data;
      });
  }

  handleUploadImage(caller, ev) {
    this.dialog = this.$mdDialog.show({
        scope: this.$scope,
        preserveScope: true,
        controller: DialogImagesController,
        templateUrl: 'selectImage.tmpl.pug',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(answer => {
        if (caller = 'logo') {
          //this.ongForm.logo = `https://s3.amazonaws.com/rogatis/${this.imagesList[answer]}`;
        }
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
      .then(res => {console.log(res);}
    );
  }
}

DialogImagesController.$inject = ['$scope', '$mdDialog'];

function DialogImagesController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}


export default angular.module('doebemOrgApp.cadOng', [ngRoute, require('angular-input-masks')])
  .config(routing)
  .component('cadOng', {template: require('./cad-ong.pug'), controller: CadOngController})
  .name;
