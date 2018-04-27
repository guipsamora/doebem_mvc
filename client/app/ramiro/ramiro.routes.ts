'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/aniversarioramiro', {
      template: '<ramiro></ramiro>'
    });
};

