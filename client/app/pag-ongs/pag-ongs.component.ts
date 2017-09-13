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

  carregaLista() {
    this.$http.get(`api/ong/${this.$routeParams.id}`)
      .then(res => {
        this.infoOng = res.data;
        // console.log(this.infoOng)
      });
  }
  
  $onInit() {
    this.carregaLista();
  }

  callPagarme(contactForm){

    var am = contactForm.amount;
    // INICIAR A INSTÂNCIA DO CHECKOUT
    // declarando um callback de sucesso
    var checkout = new PagarMeCheckout.Checkout({
      "encryption_key": "ek_test_QifcmAvy9wCtsgrUr04o884mXp1HiP", 
      success: (data) => {
        console.log(data);
        console.log(am);
        data.am = am;
        //Tratar aqui as ações de callback do checkout, como exibição de mensagem ou envio de token para captura da transação
        // if(data){
        this.$http.post('/pagOngs/saudecrianca', data)
          .then(res => {
            console.log(res);
          })
        // }
      },  
      error: function(err) {
        console.log(err);
        this.resultPagarme = false;
      }
    });

    // DEFINIR AS OPÇÕES
    // e abrir o modal
    // É necessário passar os valores boolean em "var params" como string
    var params = {
      "amount": am,
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
      "customerName":"",
      "customerDocumentNumber":"",
      "customerEmail":"",
      "customerAddressStreet":"",
      "customerAddressStreetNumber":"",
      "customerAddressComplementary":"",
      "customerAddressNeighborhood":"",
      "customerAddressCity":"",
      "customerAddressState":"",
      "customerAddressZipcode":"",
      "customerPhoneDdd":"",
      "customerPhoneNumber":"",
      "boletoHelperText":"Podemos levar em média de 1 a 2 dias para que o pagamento seja aprovado.",
      "creditCardHelperText":"Podemos levar até um dia para que o pagamento seja aprovado.",
    };
    
    checkout.open(params);

  }
}

//   showDialog(){
//     this.dialog = this.$mdDialog.show({
//       scope: this.$scope,
//       preserveScope: true,
//       controller: DialogController,
//       templateUrl: 'dialogPagarme.tmpl.pug',
//       parent: angular.element(document.body),
//       clickOutsideToClose: true,
//       fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
//     })
//   }



// function DialogController($scope, $mdDialog, $inject ,$log,$http, user, form) {

//     $scope.payment = form;
//     console.log(form);

//     $scope.hide = function() {
//       $mdDialog.hide();
//     };
  
//     $scope.cancel = function() {
//       $mdDialog.cancel();
//     };
  
//     $scope.answer = function(answer) {
//       $mdDialog.hide(answer);
//     };

//     $scope.postForm = function(form) {
//       console.log('form: called', form);
//     }
// }

// DialogController.$inject = ['$scope', '$mdDialog'];

export default angular.module('doebemOrgApp.pagOngs', [ngRoute, contactForm, ngSanitize])
  .config(routing)
  .component('pagOngs', { template: require('./pag-ongs.pug'), controller: PagOngs })
  .name;
