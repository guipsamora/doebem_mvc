'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/aniversariodobruno', {
      template: '<bruno></bruno>'
    });
};

