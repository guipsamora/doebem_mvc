'use strict';

const angular = require('angular');
const ngMaterial = require('angular-material');
const duScroll = require('angular-scroll');

declare var PagarMeCheckout: any;

export class NavbarComponent {

  $mdDialog;
  dialog: Function;
  $document;
  $location;
  $http;
  $scope;
  duration: number;
  top: number;
  anchorSmoothScroll;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;
  PagarMeCheckout: any;

  menu = [
    {
      'title': 'METODOLOGIA',
      'link': 'metodologia'
    },
    {
      'title': 'TRANSPARÊNCIA',
      'link': 'transparencia'
    },
    {
      'title': 'SOBRE',
      'link': 'sobre'
    },
    {
      'title': 'DÚVIDAS',
      'link': 'duvidas'
    },
    {
      'title': 'CONTATO',
      'link': './#contato'
    }
  ];

  org = ['Saúde Criança', 'Renovatio'];

  selected = [];

  toggle (org, list) {
    var idx = list.indexOf(org);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(org);
    }

    console.log('final list ist:', list);
  };

  exists(org, list) {
    return list.indexOf(org) > -1;
  };

  constructor($location, Auth, $document, $mdDialog, $scope, $http) {
    'ngInject';
    this.$location = $location;
    this.$http = $http;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.top = 400;
    this.duration = 1500; //milliseconds
    this.$document = $document;
    this.$mdDialog = $mdDialog;
    this.$scope = $scope;
    this.PagarMeCheckout;
  }

  isActive(route) {
    return route === this.$location.path();
  }

  invertedEasingFunction(x) {
     return 1 - x;
  }

  scrollTop() {
     this.$document.scrollTop(this.top, this.duration);
  }

  scrollToSection(eID) {
    var section = angular.element(document.getElementById(eID));
    this.$document.scrollToElementAnimated(section, 70, this.duration);
  }

  showForm(form) {
    form.org = this.selected;
    console.log(form);
  }

  showDialog() {
    this.dialog = this.$mdDialog.show({
      scope: this.$scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'dialogDonateNavbar.tmpl.pug',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }

  closeDialog() {
    this.dialog = this.$mdDialog.cancel();
  }

  callPagarme(pagarmeForm) {

    var amountValue = pagarmeForm.amount;

    // INICIAR A INSTÂNCIA DO CHECKOUT
    // declarando um callback de sucesso
    var checkout = new PagarMeCheckout.Checkout({
      'encryption_key': 'ek_test_QifcmAvy9wCtsgrUr04o884mXp1HiP',
      success: (data) => {

        data.amount = amountValue;

        console.log(data);
        //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
        this.$http.post('/pagOngs/*', data)
          .then(res => { console.log(res); })
          .then(this.$location.path('/sucesso'));

        this.closeDialog();
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



}


function DialogController($scope, $mdDialog, $inject) {

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

DialogController.$inject = ['$scope', '$mdDialog'];

export default angular.module('directives.navbar', [ngMaterial, duScroll])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
