const angular = require('angular');
const ngRoute = require('angular-route');
// import routing from './cad-ong.routes';


// const DialogImagesController = ($scope, $mdDialog) => {
//   $scope.hide = () => $mdDialog.hide();
//   $scope.cancel = () => $mdDialog.cancel();
//   $scope.answer = (answer) => $mdDialog.hide(answer);
// };

// DialogImagesController.$inject = ['$scope', '$mdDialog'];

export class CheckoutComponent {
  $mdDialog;
  dialog: Function;
  $http;
  $scope;
  user: Object;

  constructor($http, $scope, $animate, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
  }


  addTransaction(form, ev) {
    console.log(form);
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

  // showDialog() {
  //   this.dialog = this.$mdDialog.show({
  //     scope: this.$scope,
  //     preserveScope: true,
  //     controller: DialogController,
  //     templateUrl: 'dialogEmailSend.tmpl.pug',
  //     parent: angular.element(document.body),
  //     clickOutsideToClose: false,
  //     fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
  //   });
  // }
}


export default angular.module('directives.checkoutForm', [])
  .component('checkoutForm', {
    template: require('./checkout-form.pug'),
    controller: CheckoutComponent
  })
  .name;
