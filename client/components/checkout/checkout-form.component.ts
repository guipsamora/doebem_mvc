const angular = require('angular');
const angularPayments = require('angular-payments');

export class CheckoutComponent {
  $mdDialog;
  dialog: Function;
  $http;
  $scope;
  checkoutForm: {};
  name;
  amount;
  originalAmount;
  source: Array<String>;

   // transform value  into cents, Cielo's API only accepts cents
  static transformToCents = (value: number) => {
    return value * 100;
  }

  // capitalize the first letter of the Credit Card brand
  static capitalizeFirstLetter = (string) => {
    string = ( string === 'mastercard' ) ? 'master' : string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor($http, $scope, $animate, $mdDialog) {

    this.source = [
      'Redes Sociais (Facebook, Twitter)',
      'Email',
      'Mídia',
      'Busca no Google',
      'Indicação de parentes / amigos'
    ];
    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;

    $scope.type = 1;
    $scope.showSend = false;
    $scope.showNext = true;
    $scope.showPrevious = false;

    $scope.nextView = () => {
      $scope.type++;
      if ($scope.type > 1 && $scope.type < 4) {
        $scope.showPrevious = true;
      }
      if ($scope.type === 4) {
        $scope.type = 3;
      };
      if ($scope.type === 3) {
        $scope.showSend = true;
        $scope.showNext = false;
      }
    };

    $scope.previousView = () => {
      $scope.type--;
      $scope.showSend = false;
      if ($scope.type === 0) {
        $scope.type = 1;
      };
      if ($scope.type > 0 && $scope.type < 3) {
        $scope.showNext = true;
      }
      if ($scope.type === 1) {
        $scope.showPrevious = false;
      }
    };
    // olha se o botão de 10% é true ou false
    $scope.$watch('checkoutForm.checked', () => {
      if ($scope.checkoutForm.checked) {
        $scope.checkoutForm.paymentInfo.additional = $scope.checkoutForm.paymentInfo.initial * 0.10;
        $scope.checkoutForm.paymentInfo.amount = $scope.checkoutForm.paymentInfo.initial * 1.10;
        return;
      } else {
        $scope.checkoutForm.paymentInfo.additional = 0;
        $scope.checkoutForm.paymentInfo.amount = $scope.checkoutForm.paymentInfo.initial;
        return;
      }
    }, true);

    // olha se o valor inicial foi alterado
    $scope.$watch('checkoutForm.paymentInfo.initial', () => {
      if ($scope.checkoutForm.checked) {
        $scope.checkoutForm.paymentInfo.additional = $scope.checkoutForm.paymentInfo.initial * 0.10;
        $scope.checkoutForm.paymentInfo.amount = $scope.checkoutForm.paymentInfo.initial + $scope.checkoutForm.paymentInfo.additional;
        return;
      } else {
        $scope.checkoutForm.paymentInfo.additional = 0;
        $scope.checkoutForm.paymentInfo.amount = $scope.checkoutForm.paymentInfo.initial;
        return;
      }
    },  true);

  }

  addTransaction(form, ev) {
    form.paymentInfo.type = 'Credicard';
    form.paymentInfo.amount = CheckoutComponent.transformToCents(form.paymentInfo.amount);
    form.paymentInfo.installments = 1;
    console.log('form no checkout', form);
    this.$http.post('/api/paymentTransaction', form)
        .then(res => {
          this.showDialog();
          this.$scope.checkoutForm.$setPristine();
          this.$scope.checkoutForm.$setUntouched();
          this.$scope.checkoutForm = {};
        })
        .catch(err => console.log(err));
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

export default angular.module('directives.checkoutForm', ['angularPayments', require('angular-input-masks'), 'ui.bootstrap'])
  .component('checkoutForm', {
    template: require('./checkout-form.pug'),
    controller: CheckoutComponent
  })
  .name;
