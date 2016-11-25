'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/sobre', {
      template: '<sobre></sobre>'
    });
};
