'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/niverdabel', {
      template: '<elisa></elisa>'
    });
};

