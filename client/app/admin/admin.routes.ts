'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/admin', {
      template: require('./admin.pug'),
      controller: 'AdminController',
      controllerAs: 'admin',
      authenticate: 'admin'
    });
};

