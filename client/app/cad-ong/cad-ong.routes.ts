'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/cadOng', {
      template: '<cad-ong></cad-ong>'
    });
};
