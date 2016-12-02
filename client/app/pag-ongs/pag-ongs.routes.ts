'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/pagOngs', {
      template: '<pag-ongs></pag-ongs>'
    })
    .when('/pagOngs/:slug', {
      template: '<pag-ongs></pag-ongs>'
    })
    .otherwise({
          redirectTo: '/listOngs'
    });        
};

