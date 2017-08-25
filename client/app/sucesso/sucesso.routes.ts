'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/sucesso', {
      template: '<sucesso></sucesso>'
    });
};
