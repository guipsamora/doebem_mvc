'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/metodologia', {
      template: '<metodologia></metodologia>'
    });
};
