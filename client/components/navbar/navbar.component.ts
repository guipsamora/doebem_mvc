'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
const ngMaterial = require('angular-material');
const duScroll = require('angular-scroll');

export class NavbarComponent {

  menu = [
  {
    'title': 'METODOLOGIA',
    'link': 'metodologia'
  }, {
    'title': 'TRANSPARÊNCIA',
    'link': 'transparencia'
  }, {
    'title': 'SOBRE',
    'link': 'sobre'
  }, {
    'title': 'DÚVIDAS',
    'link': 'duvidas'
  }, {
    'title': 'BLOG',
    'link': 'https://medium.com/@doebem'
  }
  ];

  $document;
  $location;
  duration: number;
  top: number;
  anchorSmoothScroll;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor($location, Auth, $document) {
    'ngInject';
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.top = 400;
    this.duration = 1500; //milliseconds
    this.$document = $document;
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
}

export default angular.module('directives.navbar', [ngMaterial, duScroll])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;

// 'use strict';
// /* eslint no-sync: 0 */

// import angular from 'angular';
// import angularAria from 'angular-aria';
// import ngAnimate from 'angular-animate';
// import angularMaterial from 'angular-material';
// import angularMessages from 'angular-messages';

// export class NavbarComponent {
//   constructor($location, $mdSidenav, $animate, $scope, Auth, $timeout) {
//     'ngInject';
//     $scope.pageClass = 'pageNavbar';
//     this.$location = $location;
//     this.isLoggedIn = Auth.isLoggedInSync;
//     this.isAdmin = Auth.isAdminSync;
//     this.getCurrentUser = Auth.getCurrentUserSync;
//     this.$scope = $scope;
//     this.$timeout = $timeout;
//     this.$animate = $animate;
//     this.enterState = true;
//     this.myCssVar = 'animated fadeInDown';
//     this.$timeout(() => {
//       this.myCssVar = '';
//     }, 1000);
//   }

//   isActive(route) {
//     return route === this.$location.path();
//   }

//   animate() {
//     this.myCssVar = 'animated fadeInDown';
//     this.$timeout(() => {
//       this.myCssVar = '';
//     }, 1000);
//   }
// }

// export default angular.module(%27directives.navbar%27, [angularAria, ngAnimate, angularMaterial, angularMessages])
//   .component('navbar', {
//     template: require('./navbar.pug'),
//     controller: NavbarComponent
//   })
//   .name;