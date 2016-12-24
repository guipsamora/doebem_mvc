'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/transparencia', {
      template: '<transparencia></transparencia>'
    });
};
