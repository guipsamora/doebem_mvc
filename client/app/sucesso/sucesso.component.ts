const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './sucesso.routes';
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
               filantropia para eliminar a extrema pobreza no Brasil',
        icon: '../../assets/images/sobre/icone1.png'
      },
      {
        title: 'CONFIANÇA',
        desc: 'Plataforma de doações com análises de organizações sem fins lucrativos recomendadas',
        icon: '../../assets/images/sobre/icone2.png'
      },
      {
        title: 'RECOMENDAÇÃO',
        desc: 'Recomendamos organizações sociais selecionadas a partir de uma análise rigorosa. \
               Promovemos a transparência, segurança e confiança na doação',
        icon: '../../assets/images/sobre/icone3.png'
      },
    ];

    this.listaPessoas = [
      {
       nome: 'Elisa',
       img: './assets/images/team/1.jpg',
       twitter: 'https://twitter.com/elisa_mansur',
       linkedin: 'https://www.linkedin.com/in/elisa-de-rooij-mansur-30435854/en'
      },
      {
       nome: 'Guilherme',
       img: './assets/images/team/2.jpg',
       twitter: 'https://twitter.com/guisamora',
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

export default angular.module('doebemOrgApp.sucesso', [ ngRoute, contactForm]) .config(routing) .component('sucesso', {
  template: require('./sucesso.pug'),
  controller: SobreController
})
.name;
