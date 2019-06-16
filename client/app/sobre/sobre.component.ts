const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './sobre.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class SobreController {
  $http;
  $scope;
  $routeParams;
  stepOptions = [ ];
  listaPessoas = [ ];
  listaVoluntarios = [ ];

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.stepOptions = [
      {
        title: 'Ciência & Filantropia',
        desc: 'Acreditamos em uma forma mais efetiva de ajudar, aliando pensamento científico à \
               filantropia',
        icon: '../../assets/images/sobre/icone1.png'
      },
      {
        title: 'Confiança',
        desc: 'Plataforma de doações com análises de organizações sem fins lucrativos recomendadas',
        icon: '../../assets/images/sobre/icone2.png'
      },
      {
        title: 'Recomendação',
        desc: 'Promovemos a transparência, segurança e confiança na doação',
        icon: '../../assets/images/sobre/icone3.png'
      },
    ];

    this.listaPessoas = [
      {
        nome: 'Elisa',
        img: './assets/images/team/1.jpg',
        linkedin: 'https://www.linkedin.com/in/elisa-de-rooij-mansur-30435854/en',
        email: 'elisa.mansur@doebem.org.br',
      },
      {
        nome: 'Guilherme',
        img: './assets/images/team/2.jpg',
        linkedin: 'https://br.linkedin.com/in/guisamora',
        email: 'guilherme.samora@doebem.org.br',
      },
      {
        nome: 'Fernando',
        img: './assets/images/team/fernando_3.jpg',
        twitter: '',
        linkedin: 'https://www.linkedin.com/in/folivimoreno/',
        email: 'fernando.moreno@doebem.org.br',
       }
    ];
  }

  $onInit() {
  }
}

export default angular.module('doebemOrgApp.sobre', [ ngRoute, contactForm]) .config(routing) .component('sobre', {
  template: require('./sobre.pug'),
  controller: SobreController
})
.name;
