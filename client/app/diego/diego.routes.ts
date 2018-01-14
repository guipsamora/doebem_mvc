'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/aniversariodiego', {
      template: '<diego></diego>'
    });
};

