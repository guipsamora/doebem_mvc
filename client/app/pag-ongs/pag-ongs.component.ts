const angular = require('angular');
const ngRoute = require('angular-route');
const ngSanitize = require('angular-sanitize');
import routing from './pag-ongs.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class PagOngs {
  $http;
  $scope;
  $routeParams;
  $mdDialog;
  dialog: Function;
  stepOptions = [];
  listOng = [];
  pageTitle;
  pageImage;
  infoOng;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;
    this.pageTitle = '';
    this.pageImage = '';
    this.infoOng = '';
  }

  carregaLista() {
    this.$http.get(`api/ong/${this.$routeParams.id}`)
      .then(res => {
        this.infoOng = res.data;
        console.log(this.infoOng)
      });
  }

  $onInit() {
    this.carregaLista();
  }

  carregaPagarme(){
    this.showDialog();
  }

  



  showDialog() {

    this.dialog = this.$mdDialog.show({
      scope: this.$scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'dialogPagarme.tmpl.pug',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    // .then(this.$http.post('/api/pagarme'))
    // .then(res => {
    //   console.log(res);
    // });
  }
}


function DialogController($scope, $mdDialog, $inject, form) {

    $scope.payment = form;
    console.log(form);

    $scope.hide = function() {
      $mdDialog.hide();
    };
  
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.postForm = function(form) {
      console.log('form: called', form);
    }
  }



DialogController.$inject = ['$scope', '$mdDialog'];

export default angular.module('doebemOrgApp.pagOngs', [ngRoute, contactForm, ngSanitize])
  .config(routing)
  .component('pagOngs', { template: require('./pag-ongs.pug'), controller: PagOngs })
  .name;
