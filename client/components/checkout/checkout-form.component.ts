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

  constructor($http, $scope, $animate, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;

    $scope.type = 1;
    $scope.showSend = false;
    $scope.showNext = true;
    $scope.showPrevious = false;

    $scope.nextView = function() {
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
      console.log($scope.type);
    };

    $scope.previousView = function() {
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
      console.log($scope.type);
    };
    // olha se o botão de 10% é true ou false
    $scope.$watch('checkoutForm.checked', () => {

      if ($scope.checkoutForm.checked) {
        $scope.checkoutForm.Payment.Additional = $scope.checkoutForm.Payment.Initial * 0.10;
        $scope.checkoutForm.Payment.Amount = $scope.checkoutForm.Payment.Initial + $scope.checkoutForm.Payment.Additional;
        return;
      } else {
        $scope.checkoutForm.Payment.Additional = 0;
        $scope.checkoutForm.Payment.Amount = $scope.checkoutForm.Payment.Initial;
        return;
      }
    }, true);

    // olha se o valor inicial foi alterado
    $scope.$watch('checkoutForm.Payment.Initial', () => {

      if ($scope.checkoutForm.checked) {
        $scope.checkoutForm.Payment.Additional = $scope.checkoutForm.Payment.Initial * 0.10;
        $scope.checkoutForm.Payment.Amount = $scope.checkoutForm.Payment.Initial + $scope.checkoutForm.Payment.Additional;
        return;
      } else {
        $scope.checkoutForm.Payment.Additional = 0;
        $scope.checkoutForm.Payment.Amount = $scope.checkoutForm.Payment.Initial;
        return;
      }
    },  true);

    $scope.source = ['Redes Sociais (Facebook, Twitter)', 'Email',
                     'Mídia', 'Busca no Google', 'Indicação de parentes / amigos'];
  }

  // transform value  into cents, Cielo's API only accepts cents
  transformToCents(value) {
    return value * 100;
  }

  // capitalize the first letter of the Credit Card brand
  capitalizeFirstLetter(string) {
    string = ( string === 'mastercard' ) ? 'master' : string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  addTransaction(form, ev) {
    form.Payment.Amount = this.transformToCents(form.Payment.Amount);
    form.Payment.CreditCard.Brand = this.capitalizeFirstLetter(form.Payment.CreditCard.Brand);
    form.Payment.Installments = 1;
    form.Payment.Type = 'CreditCard';
    form.MerchantOrderId = Date.now().toString();
    this.name = form.Customer.Name;
    this.amount = form.Payment.Amount;
    console.log(form);
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
