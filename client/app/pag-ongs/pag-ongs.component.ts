const angular = require('angular');
const ngRoute = require('angular-route');
const ngSanitize = require('angular-sanitize');
import routing from './pag-ongs.routes';
import contactForm from '../../components/contact-form/contact-form.component';

declare var PagarMeCheckout: any;

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
  PagarMeCheckout: any;

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;
    this.pageTitle = '';
    this.pageImage = '';
    this.infoOng = '';
    this.PagarMeCheckout;
  }

  ok(){
    // Close the modal dialog
    
    console.log("called")
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
    // console.log(checkout);
    // var checkout = new PagarMeCheckout.Checkout({"encryption_key":"ek_test_QifcmAvy9wCtsgrUr04o884mXp1HiP", success: function(data) {
    //   console.log(data);
    //   //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
    // }});
    // console.log(checkout);
    console.log(this.PagarMeCheckout);
  }

  carregaPagarme(){
    this.showDialog();
  }

  callPagarme(){
    console.log("callPagarme: Chamadoooo")
          // INICIAR A INSTÂNCIA DO CHECKOUT
      // declarando um callback de sucesso
    var checkout = new PagarMeCheckout.Checkout({"encryption_key":"ek_test_QifcmAvy9wCtsgrUr04o884mXp1HiP", 
      success: function(data) {
          console.log(data);
          // this.$http.get(`api/ong/${this.$routeParams.id}`)
          //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
      },  
      error: function(err) {
        console.log(err);
      }
    )

    console.log(checkout);

          // "customerName":"",
      // "customerDocumentNumber":"",
      // "customerEmail":"",
      // "customerAddressStreet":"",
      // "customerAddressStreetNumber":"",
      // "customerAddressComplementary":"",
      // "customerAddressNeighborhood":"",
      // "customerAddressCity":"",
      // "customerAddressState":"",
      // "customerAddressZipcode":"",
      // "customerPhoneDdd":"",
      // "customerPhoneNumber":"",

    // DEFINIR AS OPÇÕES
    // e abrir o modal
    // É necessário passar os valores boolean em "var params" como string
    var params = {
      "amount":1000,
      "buttonText":"Pagar",
      "customerData":"true",
      "paymentMethods":"boleto,credit_card",
      "uiColor":"#3f51b5",
      "postbackUrl":"http://sandbox-doebem.herokuapp.com/api/pagarme",
      "createToken":"true",
      "interestRate":0,
      "freeInstallments":0,
      "defaultInstallment":1,
      "maxInstallments":1,
      "headerText":"Total a pagar {price_info}.",
      "disableZeroDocumentNumber":"true",
      "billing": {
        "address": {
            "object": "address",
            "street": "Rua Matrix",
            "complementary": null,
            "street_number": "9999",
            "neighborhood": "Rio Cotia",
            "city": "Cotia",
            "state": "sp",
            "zipcode": "06714360",
            "country": "br",
            "id": 145818
        },
        "object": "billing",
        "id": 30,
        "name": "Trinity Moss"
      },
      "boletoHelperText":"Podemos levar em média de 1 a 2 dias para que o pagamento seja aprovado.",
      "creditCardHelperText":"Podemos levar até um dia para que o pagamento seja aprovado.",
    };

    checkout.open(params);
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
  }
}


function DialogController($scope, $mdDialog, $inject ,$log,$http, user, form) {

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
