const angular = require('angular');
const ngRoute = require('angular-route');
const ngSanitize = require('angular-sanitize');
const vcRecaptcha = require('angular-recaptcha');
import routing from './main.routes';
import contactForm from '../../components/contact-form/contact-form.component';

declare var PagarMeCheckout: any;

export class MainController {
  $http;
  $scope;
  $location;
  $routeParams;
  $mdDialog;
  dialog: Function;
  stepOptions = [];
  resultsBR = [];
  resultsGW = [];
  listOng = [];
  midias = [];
  PagarMeCheckout: any;

  /*@ngInject*/
  constructor($http, $scope, socket, $mdDialog, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.listOng = [];
    this.midias = [];

    this.stepOptions = [
      {
        title: 'Confiança',
        desc: 'As organizações recomendadas são rigorosamente analisadas com base em impacto, gestão e transparência.',
        icon: '../../assets/images/main/icone1.png'
      },
      {
        title: 'Praticidade',
        desc: 'Você não precisa gastar horas pensando como, quanto ou quem ajudar. \
               Te ajudamos com isso: basta clicar e começar a fazer a diferença!',
        icon: '../../assets/images/main/icone2.png'
      },
      {
        title: 'Acompanhamento',
        desc: 'Transparência é muito importante para nós! Você acompanha o seu impacto positivo no Brasil e \
               recebe novidades sobre a organização que suporta.',
        icon: '../../assets/images/main/icone3.png'
      }
    ];

    this.resultsBR = [
      {
        value: '250',
        desc: 'crianças recebendo leite por um mês.'
      },
      {
        value: '190',
        desc: 'óculos de baixo-custo \
              fabricados',
      },
      {
        value: '5',
        desc: 'cirurgias de catarata \
               em crianças.',
      }
    ];
    
    this.resultsGW = [
      {
        value: '85',
        desc: 'redes tratadas com inseticida distribuídas',
      },
      {
        value: 'R$ 1.886',
        desc: 'para programas de transferência de renda',
      },
      {
        value: '320',
        desc: 'crianças tratadas para desparasitação',
      }
    ];    

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

    console.log('final list ist:', list);
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

  blured(pagarmeForm) {
    if (pagarmeForm.input < 10) {
      pagarmeForm.input = 10;
    }
  }

  $onInit() {
    this.carregaLista();
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
        data.periodo = periodicidade;
        data.message = mensagem;
        data.doebem = dezPorcento;

        console.log(data);
        //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
        this.$http.post('/api/pagarme', data)
          .then(res => {
                  console.log(res);
                },
                error => {
                  console.log(error);
                  return;
                })
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

  showDialogDonation() {
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
}

function DialogController($scope, $mdDialog, $inject, $log, $http, user) {

  $scope.pagarmeForm = {
    amount: 2000,
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

export default angular.module('doebemOrgApp.main', [ngRoute, contactForm, ngSanitize, vcRecaptcha])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
