'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/niverre', {
      template: '<renata></renata>'
    });
};

