'use strict';

const angular = require('angular');
const ngMaterial = require('angular-material');
const duScroll = require('angular-scroll');


export class NavbarComponent {

  $mdDialog;
  dialog: Function;
  $document;
  $location;
  $scope;
  duration: number;
  top: number;
  anchorSmoothScroll;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;
  
  menu = [
    {
      'title': 'METODOLOGIA',
      'link': 'metodologia'
    },
    {
      'title': 'TRANSPARÊNCIA',
      'link': 'transparencia'
    },
    {
      'title': 'SOBRE',
      'link': 'sobre'
    },
    {
      'title': 'DÚVIDAS',
      'link': 'duvidas'
    },
    {
      'title': 'CONTATO',
      'link': './#contato'
    }
  ];

  constructor($location, Auth, $document, $mdDialog, $scope) {
    'ngInject';
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.top = 400;
    this.duration = 1500; //milliseconds
    this.$document = $document;
    this.$mdDialog = $mdDialog;
    this.$scope = $scope;
  }

  isActive(route) {
    return route === this.$location.path();
  }

  invertedEasingFunction(x) {
     return 1 - x;
  }

  scrollTop() {
     this.$document.scrollTop(this.top, this.duration);
  }

  scrollToSection(eID) {
    var section = angular.element(document.getElementById(eID));
    this.$document.scrollToElementAnimated(section, 70, this.duration);
  }

  showForm(form) {
    console.log(form);
  }

  showDialog() {
    this.dialog = this.$mdDialog.show({
      scope: this.$scope,
      preserveScope: true,
      controller: DialogController,
      templateUrl: 'dialogDonateNavbar.tmpl.pug',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
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

export default angular.module('directives.navbar', [ngMaterial, duScroll])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
