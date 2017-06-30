'use strict';

const angular = require('angular');
const ngMaterial = require('angular-material');
const duScroll = require('angular-scroll');

export class NavbarComponent {

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
      'title': 'BLOG',
      'link': 'https://medium.com/doebem'
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
