'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/checkout', {
      template: '<checkout></checkout>'
    });
};
