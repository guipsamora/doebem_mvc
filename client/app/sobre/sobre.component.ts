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
  listaConselheiros = [ ];

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.stepOptions = [
      {
        title: 'CIÊNCIA & FILANTROPIA',
        desc: 'Acreditamos em uma forma mais efetiva de ajudar, aliando pensamento científico à \
               filantropia',
        icon: '../../assets/images/sobre/icone1.png'
      },
      {
        title: 'CONFIANÇA',
        desc: 'Plataforma de doações com análises de organizações sem fins lucrativos recomendadas',
        icon: '../../assets/images/sobre/icone2.png'
      },
      {
        title: 'RECOMENDAÇÃO',
        desc: 'Promovemos a transparência, segurança e confiança na doação',
        icon: '../../assets/images/sobre/icone3.png'
      },
    ];

    this.listaPessoas = [
      {
       nome: 'Elisa',
       img: './assets/images/team/1.jpg',
       area: 'Marketing',
       linkedin: 'https://www.linkedin.com/in/elisa-de-rooij-mansur-30435854/en'
      },
      {
        nome: 'Rhayana',
        img: './assets/images/team/3.jpg',
        area: 'Pesquisa',
        linkedin: 'https://www.linkedin.com/in/rhayana-holz-a1916a5a/'
      },
      {
       nome: 'Guilherme',
       img: './assets/images/team/2.jpg',
       area: 'Tecnologia',
       linkedin: 'https://br.linkedin.com/in/guisamora'
      }
    ];

    this.listaConselheiros = [
        {nome: 'Jean P de Rogatis',
         img: './assets/images/team/2.jpg',
         twitter: '',
         linkedin: ''
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
