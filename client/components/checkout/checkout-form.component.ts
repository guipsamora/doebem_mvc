const angular = require('angular');
// const ngRoute = require('angular-route');
// import routing from './cad-ong.routes';

export class CheckoutComponent {
  $mdDialog;
  dialog: Function;
  $http;
  $scope;
  checkoutForm: {};

  constructor($http, $scope, $animate, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
  }



  addTransaction(form, ev) {
    console.log(form);
    this.$http.post('/api/checkoutForm', form)
      .then(res => {
        this.dialog = this.$mdDialog.show({
          scope: this.$scope,
          preserveScope: true,
          controller: DialogImagesController,
          templateUrl: 'save.tmpl.pug',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          // fullscreen: this.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then( () => {
          this.checkoutForm = null;
          this.$scope.checkoutForm.$setPristine();
          this.$scope.checkoutForm.$setUntouched();
        });
    })
    .catch(err => console.log(err));
  }


  // transform value into cents, the API only accepts cents
  transformToCents(value) {
    return value * 100;
  }

  // sendEmail() {
  //   this.$http.post('/api/contactForm', this.user)
  //     .then(res => {
  //       this.showDialog();
  //       this.$scope.contactForm.$setPristine();
  //       this.$scope.contactForm.$setUntouched();
  //       this.user = {};
  //     });
  // }

}

const DialogImagesController = ($scope, $mdDialog) => {
  $scope.hide = () => $mdDialog.hide();
  $scope.cancel = () => $mdDialog.cancel();
  $scope.answer = (answer) => $mdDialog.hide(answer);
};

DialogImagesController.$inject = ['$scope', '$mdDialog'];

export default angular.module('directives.checkoutForm', [require('angular-input-masks')])
  .component('checkoutForm', {
    template: require('./checkout-form.pug'),
    controller: CheckoutComponent
  })
  .name;
