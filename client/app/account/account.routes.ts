'use strict';


export default function routes($routeProvider) {
    'ngInject';
    $routeProvider
      .when('/login', {
        template: require('./login/login.pug'),
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/logout', {
        name: 'logout',
        referrer: '/',
        template: '',
        controller: function($location, $route, Auth) {
          var referrer = $route.current.params.referrer ||
                          $route.current.referrer ||
                          '/';
          Auth.logout();
          $location.path(referrer);
        }
      })
      .when('/signup', {
        template: require('./signup/signup.pug'),
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .when('/settings', {
        template: require('./settings/settings.pug'),
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
}
