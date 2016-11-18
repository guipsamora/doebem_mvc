'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/listOngs', {
      template: '<list-ongs></list-ongs>'
    })
    .when('/listOngs/:filterCausa', {
      template: '<list-ongs></list-ongs>'
    })
    .otherwise({
          redirectTo: '/listOngs'
    });
};

