const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './doar.routes';
import contactForm from '../../components/contact-form/contact-form.component';

declare var PagarMeCheckout: any;

export class DoarController {
  $http;
  $scope;
  $routeParams;
  $location;
  PagarMeCheckout: any;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.PagarMeCheckout = Function;
  }

  // Handles the payment popup
  org = ['Saúde Criança', 'Renovatio', 'Caviver', 'A critério da doebem'];

  // Handles the payment popup
  orgInt = ['GiveDirectly', 'Schistosomiasis Control Initiative', 'Against Malaria Foundation'];

  selected = [];

  toggle(org, list) {
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
    {value: 1000, label: 'R$10', input: false},
    {value: 2000, label: 'R$20', input: false},
    {value: 4000, label: 'R$40', input: false},
    {value: 5000, label: 'R$50', input: false},
    {value: 10000, label: 'R$100', input: false},
    {value: this.Custom, label: '' + this.Custom, input: true},
  ];

  periods = [
    {value: 'Avulsa', label: 'Avulsa'},
    {value: 'Mensal', label: 'Mensal'},
  ];

  $onInit() {
    this.$scope.pagarmeForm = {
      amount: 2000,
      periodicidade: 'Mensal'
    };
  };

  callPagarme(pagarmeForm) {

    var mensagem = pagarmeForm.mensagem;
    var amountValue = pagarmeForm.amount;
    var periodicidade = pagarmeForm.periodicidade;
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
      'encryption_key': 'ek_test_QifcmAvy9wCtsgrUr04o884mXp1HiP',
      success: (data) => {

        data.amount = amountValue;
        data.org = this.selected;
        data.periodo = periodicidade;
        data.doebem = dezPorcento;
        data.message = mensagem;

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

export default angular.module('doebemOrgApp.doar', [ngRoute, contactForm])
  .filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
  }])
  .config(routing).component('doar', {template: require('./doar.pug'),
  controller: DoarController
})
.name;
