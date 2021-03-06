'use strict';

const angular = require('angular');
const ngMaterial = require('angular-material');
const duScroll = require('angular-scroll');
const vcRecaptcha = require('angular-recaptcha');

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
      'title': 'TRANSPARÊNCIA',
      'link': 'transparencia'
    },
    {
      'title': 'METODOLOGIA',
      'link': 'metodologia'
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

  // Handles the payment popup

  org = ['Saúde Criança', 'Renovatio', 'Caviver', 'A critério da doebem'];
  orgInt = ['GiveDirectly', 'Schistosomiasis Control Initiative', 'Against Malaria Foundation'];

  selected = [];

  toggle (org, list) {
    var idx = list.indexOf(org);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(org);
    }

    console.log('final list is:', list);
  };

  exists(org, list) {
    return list.indexOf(org) > -1;
  };

  Custom = '';

  options = [
    {value: 2000, label: 'R$20'},
    {value: 5000, label: 'R$50'},
    {value: 10000, label: 'R$100'},
    {value: this.Custom, label: '' + this.Custom, input: true, isChecked: false},
  ];

  periods = [
    {value: 'Unica', label: 'Única'},
    {value: 'Mensal', label: 'Mensal'},
  ];

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

  blured(pagarmeForm) {
    if (pagarmeForm.input < 10) {
      pagarmeForm.input = 10;
    }
  }

  showDialog() {
    this.dialog = this.$mdDialog.show({
      focusOnOpen: false,
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
    console.log('recaptcha value:', pagarmeForm.myRecaptchaResponse);
    if (pagarmeForm.myRecaptchaResponse === undefined) {
      alert('Por favor, comprove que você não é um robô!');
      return;
    }
    var mensagem = pagarmeForm.mensagem;
    var amountValue = pagarmeForm.amount;
    var periodicidade = pagarmeForm.periodicidade;
    var headText = (amountValue / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    var dezPorcento = pagarmeForm.doebem;
    var origem = pagarmeForm.origem;

    if (!amountValue) {
      amountValue = pagarmeForm.input * 100;
      headText = (amountValue / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    }

    if (pagarmeForm.doebem && pagarmeForm.amount) {
      amountValue = Math.round(pagarmeForm.amount * 1.10);
      headText = (amountValue / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    } else if (pagarmeForm.doebem && pagarmeForm.input) {
      amountValue = Math.round(amountValue * 1.10);
      headText = (amountValue / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    };

    // INICIAR A INSTÂNCIA DO CHECKOUT
    // declarando um callback de sucesso
    var checkout = new PagarMeCheckout.Checkout({
      // 'encryption_key': 'ek_test_QifcmAvy9wCtsgrUr04o884mXp1HiP',
      'encryption_key': 'ek_live_3yykMegYY2XTPClgA1qjui2gSlvVzG',
      success: (data) => {

        data.amount = amountValue;
        data.org = this.selected;
        data.periodo = periodicidade;
        data.message = mensagem;
        data.doebem = dezPorcento;
        data.origem = origem;

        console.log(data);

        //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
        this.$http.post('/api/pagarme', data)
          .then(res => { console.log(res); }, error => { console.log(error); })
          .then(this.$location.path('/sucesso'));

        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
      }
    });

    // DEFINIR AS OPÇÕES e abrir o modal
    // É necessário passar os valores boolean em 'var params' como string
    var params = {
      'amount': amountValue,
      'buttonText': 'Pagar',
      'customerData': 'true',
      'paymentMethods': 'boleto,credit_card',
      'uiColor': '#3f51b5',
      'postbackUrl': 'http://sandbox-doebem.herokuapp.com/api/pagarme',
      'createToken': 'false',
      'interestRate': 0,
      'freeInstallments': 0,
      'defaultInstallment': 1,
      'maxInstallments': 1,
      'headerText': 'Total da doação R$ ' + headText + ' 🙏',
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

    $scope.pagarmeForm = {
      amount: 5000,
      periodicidade: 'Mensal'
    };

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

export default angular.module('directives.navbar', [ngMaterial, duScroll, vcRecaptcha])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
