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

    // olha se o botão de 10% é true ou false
    $scope.$watch('checkoutForm.checked', function(){

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
    $scope.$watch('checkoutForm.Payment.Initial', function(){

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
    this.$http.post('/api/checkoutForm', form)
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
