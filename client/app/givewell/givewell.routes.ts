'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/givewell', {
      template: '<givewell></givewell>'
    });
};
