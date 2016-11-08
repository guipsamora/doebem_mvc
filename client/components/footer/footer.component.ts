const angular = require('angular');

export class FooterComponent {}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.pug'),
    controller: FooterComponent
  })
  .name;
