const angular = require('angular');
const ngRoute = require('angular-route');

import routing from './niver_template.routes';
import contactForm from '../../components/contact-form/contact-form.component';

declare var PagarMeCheckout: any;

export class niver_templateController {
  $http;
  $scope;
  $location;
  $sce;
  $mdDialog;
  dialog: Function;

  listOng = [];
  midias = [];
  PagarMeCheckout: any;

  /*@ngInject*/
  constructor($http, $scope, $sce, socket, $mdDialog, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.$sce = $sce;
    this.$mdDialog = $mdDialog;
    this.listOng = [];
  }

  carregaLista() {
    this.$http.get(`api/ong/`)
      .then(res => {
        this.listOng = res.data;
      });
  }

  $onInit() {
    this.carregaLista();
  }

  carregaVideo() {

    this.$scope.detailFrame = this.$sce.trustAsResourceUrl('https:www.youtube.com/embed/f8xkPUdNECI');

    bringToFront();

    function bringToFront() {
      document.getElementById('video').style.zIndex = '1';
    }
  }

    // Handles the payment popup
    org = ['Saúde Criança'];

    // Handles the payment popup
    orgInt = ['GiveDirectly', 'Schistosomiasis Control Initiative', 'Against Malaria Foundation'];

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

    Custom = '';

    options = [
      {value: 1000, label: 'R$10'},
      {value: 2000, label: 'R$20'},
      {value: 4000, label: 'R$40'},
      {value: 5000, label: 'R$50'},
      {value: 10000, label: 'R$100'},
      {value: this.Custom, label: '' + this.Custom, input: true, isChecked: false},
    ];
    callPagarme(pagarmeForm) {

      var mensagem = pagarmeForm.mensagem;
      var amountValue = pagarmeForm.amount;
      var headText = (amountValue / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2});
      var dezPorcento = pagarmeForm.doebem;

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
        'encryption_key': 'ek_live_3yykMegYY2XTPClgA1qjui2gSlvVzG',
        success: (data) => {

          data.amount = amountValue;
          data.org = this.selected;
          data.message = mensagem;
          data.doebem = dezPorcento;

          console.log(data);
          //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
          this.$http.post('/api/pagarme', data)
            .then(res => { console.log(res); }, error => { console.log(error); })
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


  showDialogDonation() {
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
}

function DialogController($scope, $mdDialog, $inject, $log, $http, user) {

  $scope.pagarmeForm = {
    amount: 2000
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

export default angular.module('doebemOrgApp.niver_template', [ngRoute, contactForm])
  .config(routing)
  .component('niver_template', { template: require('./niver_template.pug'), controller: niver_templateController })
  .name;
