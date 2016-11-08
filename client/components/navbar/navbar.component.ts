'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
const ngMaterial = require('angular-material');

export class NavbarComponent {
  menu = [{
    'title': 'COMO FUNCIONA ',
    'link': '/'
  },
  {
    'title': 'CAUSAS ',
    'link': '/'
  },
  {
    'title': 'METODOLOGIA ',
    'link': '/'
  },
  {
    'title': 'SOBRE ',
    'link': '/'
  },
  {
    'title': 'BLOG ',
    'link': '/'
  },
  {
    'title': 'CONTATO ',
    'link': '/'
  }
  ];
  $location;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor($location, Auth) {
    'ngInject';
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

export default angular.module('directives.navbar', [ngMaterial])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
