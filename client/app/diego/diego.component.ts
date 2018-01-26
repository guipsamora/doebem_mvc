const angular = require('angular');
const ngRoute = require('angular-route');

import routing from './diego.routes';
import contactForm from '../../components/contact-form/contact-form.component';

declare var PagarMeCheckout: any;

export class DiegoController {
  $http;
  $scope;
  $location;
  $mdDialog;
  listOng = [];
  midias = [];
  dialog: Function;
  PagarMeCheckout: any;

  org = ['Saúde Criança', 'Renovatio', 'Caviver', 'A critério da doebem'];

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
    {value: 1000, label: 'R$10'},
    {value: 2000, label: 'R$20'},
    {value: 4000, label: 'R$40'},
    {value: 5000, label: 'R$50'},
    {value: 10000, label: 'R$100'},
    {value: this.Custom, label: '' + this.Custom, input: true, isChecked: false},
  ];  

  /*@ngInject*/
  constructor($http, $scope, socket, $location, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.listOng = [];
    this.midias = [];

    this.midias = [
      {
        src: '../../assets/images/midias/projetodraft2.png',
        link: 'http://projetodraft.com/a-doebem-quer-conectar-gente-disposta-a-ajudar-com-organizacoes-sociais-confiaveis/',
        alt: 'Projeto Draft'
      },
      {
        src: '../../assets/images/midias/awesomefoundation2.png',
        link: 'http://www.awesomefoundation.org/pt/projects/75390-doebem',
        alt: 'The Awesome Foundation'
      },
      {
        src: '../../assets/images/midias/nossacausa4.png',
        link: 'http://nossacausa.com/doebem-uma-nova-experiencia-de-doacao/',
        alt: 'Nossa Causa'
      },
      {
        src: '../../assets/images/midias/razoes2.png',
        link: 'http://razoesparaacreditar.com/apoie/ongs-doacao/',
        alt: 'Razoes Para Acreditar'
      },
      {
        src: '../../assets/images/midias/semcensura2.png',
        link: 'https://youtu.be/cbHXbvCF1FY',
        alt: 'Sem Censura'
      }
    ];
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
    var headText = (amountValue / 100).toLocaleString('pt-BR', {minimumFractionDigits: 2});

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
}


function DialogController($scope, $mdDialog, $inject) {

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


export default angular.module('doebemOrgApp.diego', [ngRoute, contactForm])
  .config(routing)
  .component('diego', {
    template: require('./diego.pug'),
    controller: DiegoController
  })
  .name;