const angular = require('angular');

export class ContactFormComponent {}

export default angular.module('directives.contactForm', [])
  .component('contactForm', {
    template: require('./contact-form.pug'),
    controller: ContactFormComponent
  })
  .name;
