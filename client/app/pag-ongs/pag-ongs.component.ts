const angular = require('angular');
const ngRoute = require('angular-route');
const ngSanitize = require('angular-sanitize');
import routing from './pag-ongs.routes';
import contactForm from '../../components/contact-form/contact-form.component';

declare var PagarMeCheckout: any;

export class PagOngs {
  $http;
  $scope;
  $sce;
  $routeParams;
  $mdDialog;
  $location;
  dialog: Function;
  stepOptions = [];
  listOng = [];
  pageTitle;
  pageImage;
  infoOng;
  PagarMeCheckout: any;

  /*@ngInject*/
  constructor($http, $scope, $sce, socket, $routeParams, $mdDialog, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$sce = $sce;
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;
    this.$location = $location;
    this.pageTitle = '';
    this.pageImage = '';
    this.infoOng = '';
    this.PagarMeCheckout = Function;
  }

  carregaLista() {
    this.$http.get(`api/ong/${this.$routeParams.id}`)
      .then(res => {
        this.infoOng = res.data;
      });
  }

  $onInit() {
    this.carregaLista();
  }

  callPagarme(pagarmeForm) {

    var amountValue = pagarmeForm.amount;
    // INICIAR A INSTÂNCIA DO CHECKOUT
    // declarando um callback de sucesso
    var checkout = new PagarMeCheckout.Checkout({
      'encryption_key': 'ek_live_3yykMegYY2XTPClgA1qjui2gSlvVzG',
      success: (data) => {

        data.amount = amountValue;

        console.log(data);
        //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
        this.$http.post('/pagOngs/*', data)
          .then(res => { console.log(res); })
          .then(this.$location.path('/sucesso'));
      },
      error: function(err) {
        console.log(err);
        this.resultPagarme = false;
      }
    });

    // DEFINIR AS OPÇÕES
    // e abrir o modal
    // É necessário passar os valores boolean em 'var params' como string
    var params = {
      'amount': amountValue,
      'buttonText': 'Pagar',
      'customerData': 'true',
      'paymentMethods': 'boleto,credit_card',
      'uiColor': '#3f51b5',
      'postbackUrl': 'http://sandbox-doebem.herokuapp.com/api/pagarme',
      'createToken': 'true',
      'interestRate': 0,
      'freeInstallments': 0,
      'defaultInstallment': 1,
      'maxInstallments': 1,
      'headerText': 'Total a pagar {price_info}.',
      'disableZeroDocumentNumber': 'true',
      'customerName': '',
      'customerDocumentNumber': '',
      'customerEmail': '',
      'customerAddressStreet': '',
      'customerAddressStreetNumber': '',
      'customerAddressComplementary': '',
      'customerAddressNeighborhood': '',
      'customerAddressCity': '',
      'customerAddressState': '',
      'customerAddressZipcode': '',
      'customerPhoneDdd': '',
      'customerPhoneNumber': '',
      'boletoHelperText': 'Podemos levar em média de 1 a 2 dias para que o pagamento seja aprovado.',
      'creditCardHelperText': 'Podemos levar até um dia para que o pagamento seja aprovado.',
    };

    checkout.open(params);

  }

  showDialog() {

    this.dialog = this.$mdDialog.show({
      scope: this.$scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'dialogVideo.tmpl.pug',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }
}

function DialogController($scope, $mdDialog, $inject, $log, $http, $sce, user) {

    $scope.detailFrame = $inject.trustAsResourceUrl($scope.$ctrl.infoOng.videoYoutube);

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

DialogController.$inject = ['$scope', '$mdDialog', '$sce'];

export default angular.module('doebemOrgApp.pagOngs', [ngRoute, contactForm, ngSanitize])
  .config(routing)
  .component('pagOngs', { template: require('./pag-ongs.pug'), controller: PagOngs })
  .name;
