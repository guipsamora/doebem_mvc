'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/niverelisa', {
      template: '<elisa></elisa>'
    });
};

