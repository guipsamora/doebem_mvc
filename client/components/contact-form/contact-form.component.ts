const angular = require('angular');

export class ContactFormComponent {
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

  sendEmail(form, ev) {
    console.log('form',form);
    this.$http.post('/api/contactForm', form)
      .then(res => {
        this.showDialog();
        this.$scope.contactForm.$setPristine();
        this.$scope.contactForm.$setUntouched();
        this.user = {};
      });
  }

  showDialog() {
    this.dialog = this.$mdDialog.show({
      scope: this.$scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'dialogEmailSend.tmpl.pug',
      parent: angular.element(document.body),
      clickOutsideToClose: false,
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

export default angular.module('directives.contactForm', [require('angular-input-masks')])
  .component('contactForm', {
    template: require('./contact-form.pug'),
    controller: ContactFormComponent
  })
  .name;
