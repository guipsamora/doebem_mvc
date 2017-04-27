const angular = require('angular');
const angularPayments = require('angular-payments');
const ngMessages = require('angular-messages');
const ngAnimate = require('angular-animate');
const ngMaterial = require('angular-material');

export class CheckoutComponent {
  $mdDialog;
  dialog: Function;
  $http;
  $scope;
  checkoutForm: {};
  source: Array<String>;
  step: number;
  showSend: boolean;
  showNext: boolean;
  showPrevious: boolean;
  donationForm: {
    checked: boolean,
    initialValue: number,
    additionalValue: number,
    donor: {
      name: string,
      email: string,
      cpf: string,
      cidade: string,
      source: string,
    },
    paymentInfo: {
      type: string,
      amount: number,
      installments: number,
      ccInfo: {
        number: string,
        brand: string,
        expDate: string,
        securityCode: string,
      }
    }
  };

   // transform value  into cents, Cielo's API only accepts cents
  static transformToCents = (value: number) => {
    return value * 100;
  }

  // capitalize the first letter of the Credit Card brand
  static capitalizeFirstLetter = (str: string) => {
    str = ( str === 'mastercard' ) ? 'master' : str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor($http, $scope, $animate, $mdDialog) {

    this.source = [
      'Redes Sociais (Facebook, Twitter)',
      'Email',
      'Mídia',
      'Busca no Google',
      'Indicação de parentes / amigos'
    ];

   this.donationForm = {
    checked: false,
    initialValue: 0,
    additionalValue: 0,
    donor: {
      name: undefined,
      email: undefined,
      cpf: undefined,
      cidade: undefined,
      source: undefined,
    },
    paymentInfo: {
      type: undefined,
      amount: 0,
      installments: 1,
      ccInfo: {
        number: undefined,
        brand: undefined,
        expDate: undefined,
        securityCode: undefined,
      }
    }
  };

    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;

    $scope.step = 1;
    this.showSend = false;
    this.showNext = true;
    this.showPrevious = false;
  }

  nextStep() {
    console.log(this.donationForm.donor);
    if (this.$scope.step === 1 && this.donationForm.paymentInfo.amount > 0) {
       this.$scope.step++;
    } else if (
      this.$scope.step === 2
      && this.donationForm.donor.name !== undefined
      && this.donationForm.donor.email !== undefined
      && this.donationForm.donor.cpf !== undefined
      && this.donationForm.donor.cidade !== undefined
      && this.donationForm.donor.source !== undefined
    ) {
      this.$scope.step++;
    }
    if (this.$scope.step > 1 && this.$scope.step < 4) {
      this.showPrevious = true;
    }
    if (this.$scope.step === 3) {
      this.showSend = true;
      this.showNext = false;
    }
    if (this.$scope.step === 4) {
      this.$scope.step--;
    };
  };

  previousStep() {
    this.$scope.step--;
    this.showSend = false;
    if (this.$scope.step === 0) {
      this.$scope.step = 1;
    };
    if (this.$scope.step > 0 && this.$scope.step < 3) {
      this.showNext = true;
    }
    if (this.$scope.step === 1) {
      this.showPrevious = false;
    }
  };

  changeInitialValue() {
    const donationForm  = this.donationForm;
    if (donationForm.checked) {
      if (donationForm.initialValue > 0) {
        donationForm.paymentInfo.amount = Math.trunc(donationForm.initialValue * 110) / 100;
      } else {
         donationForm.paymentInfo.amount = 0;
      }
    } else {
      console.log( this.donationForm);
      this.donationForm.paymentInfo.amount = donationForm.initialValue;
    }
  }

  addTransaction(ev) {
    console.log('form no checkout', this.donationForm);
    this.donationForm.paymentInfo.type = 'CreditCard';
    this.donationForm.paymentInfo.amount = CheckoutComponent.transformToCents(this.donationForm.paymentInfo.amount);
    this.donationForm.paymentInfo.installments = 1;
    this.donationForm.paymentInfo.ccInfo.brand =  CheckoutComponent.capitalizeFirstLetter(this.donationForm.paymentInfo.ccInfo.brand);
    this.$http.post('/api/paymentTransaction', this.donationForm)
        .then(res => {
          this.showDialog();
          this.$scope.checkoutForm.$setPristine();
          this.$scope.checkoutForm.$setUntouched();
          this.$scope.checkoutForm = {};
        })
        .catch(err => console.log('err at addTransaction', err));
  }

  showDialog() {
    this.dialog = this.$mdDialog.show({
      scope: this.$scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'dialogDonationMade.tmpl.pug',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  }
}

const DialogController = ($scope, $mdDialog, $inject) => {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

DialogController.$inject = ['$scope', '$mdDialog'];

export default angular.module('directives.checkoutForm', [
  'angularPayments',
  require('angular-input-masks'),
  'ui.bootstrap',
  ngMessages,
  ngAnimate,
  ngMaterial
])
  .component('checkoutForm', {
    template: require('./checkout-form.pug'),
    controller: CheckoutComponent
  })
  .name;
