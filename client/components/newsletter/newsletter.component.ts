const angular = require('angular');

export class NewsletterComponent {
  $mdDialog;
  dialog: Function;
  $http;
  $scope;
  user: Object;
  name;

  constructor($http, $scope, $animate, $mdDialog) {
    this.$http = $http;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
  }

  sendEmail(form, ev) {
    console.log('form: ', form);
    this.$http.post('/api/newsletter', form)
      .then(res => {
        console.log(res);
        this.showDialog();
      })
      .then( () => {
      this.$scope.newsletter.$setPristine();
      this.$scope.newsletter.$setUntouched();
      this.$scope.newsletter = {};
    });
  }

  showDialog() {
    this.dialog = this.$mdDialog.show({
      scope: this.$scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'dialogEmailSendNewsletter.tmpl.pug',
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

export default angular.module('directives.newsletter', [require('angular-input-masks')])
  .component('newsletter', {
    template: require('./newsletter.pug'),
    controller: NewsletterComponent
  })
  .name;
