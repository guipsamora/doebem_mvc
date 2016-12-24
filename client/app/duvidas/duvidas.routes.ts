'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/duvidas', {
      template: '<duvidas></duvidas>'
    });
};
