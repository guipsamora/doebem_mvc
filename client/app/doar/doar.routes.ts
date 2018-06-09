'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/doar', {
      template: '<doar></doar>'
    });
};
