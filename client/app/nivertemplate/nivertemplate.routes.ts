'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/niver_template', {
      template: '<nivertemplate></nivertemplate>'
    });
};

