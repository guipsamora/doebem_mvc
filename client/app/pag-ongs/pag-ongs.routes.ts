'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/pagOngs/:id', {
      template: '<pag-ongs></pag-ongs>'
    });
};

