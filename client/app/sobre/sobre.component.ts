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
        linkedin: 'https://www.linkedin.com/in/elisa-de-rooij-mansur-30435854/en',
        email: 'elisa.mansur@doebem.org.br',
        bio: 'Formada em Administração pela PUC-Rio e mestranda em negócios no MIT. \
              Elisa construiu sua carreira na indústria de infraestrutura, mas \
              sempre esteve envolvida com projetos sociais desde a adolescência. \
              É Yunus&Youth Fellow e faz parte da rede Global Shapers.'
      },
      {
        nome: 'Dominic',
        img: './assets/images/team/3.jpg',
        area: 'Pesquisa',
        linkedin: 'https://www.linkedin.com/in/dominic-doula-ribeiro-27303064/',
        email: 'dominic.ribeiro@doebem.org.br',
        bio: 'Formada em Economia pela Universidade Federal de Ouro Preto e mestre em \
              Economia pela Universidade Federal de Viçosa. Ao longo dos últimos cinco \
              anos tem se dedicado na área de pesquisa que envolve \
              métodos quantitativos associados a Avaliação de Impacto Social.'
      },
      {
        nome: 'Guilherme',
        img: './assets/images/team/2.jpg',
        area: 'Tecnologia',
        linkedin: 'https://br.linkedin.com/in/guisamora',
        email: 'guilherme.samora@doebem.org.br',
         bio: 'Formado em Administração pelo Mackenzie, participou do curso de Avaliação \
               Econômica de Projetos Sociais pela Fundação Itau Social. Guilherme construiu \
               sua carreira em empresas de tecnologia e participou da primeira turma \
               de incubação da Yunus Brasil em 2014.'
      }
    ];

    this.listaVoluntarios = [
        {
         nome: 'Fernando',
         img: './assets/images/team/fernando_3.jpg',
         twitter: '',
         linkedin: 'https://www.linkedin.com/in/folivimoreno/'
        },
        {
         nome: 'Jean',
         img: './assets/images/team/jean.png',
         twitter: '',
         linkedin: 'https://www.linkedin.com/in/jrogatis/'
        },
        {
          nome: 'Leandro',
          img: './assets/images/team/leandro.png',
          twitter: '',
          linkedin: 'https://www.linkedin.com/in/leandro-souza-ambrosio-/'
        },
        {
          nome: 'Barbara',
          img: './assets/images/team/barbara.jpg',
          twitter: '',
          linkedin: 'https://www.linkedin.com/in/barbaravilas/'
        },
        {
          nome: 'Adriana',
          img: './assets/images/team/adriana.jpg',
          twitter: '',
          linkedin: 'https://www.linkedin.com/in/barbaravilas/'
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
