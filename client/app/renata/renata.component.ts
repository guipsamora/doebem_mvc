const angular = require('angular');
const ngRoute = require('angular-route');
const jkAngularCarousel = require('../../../node_modules/angular-jk-carousel/dist/jk-carousel.js');

import routing from './renata.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class RenataController {
  $http;
  $scope;
  $location;
  stepOptions = [];
  carouselImages = [];
  listOng = [];
  midias = [];

  /*@ngInject*/
  constructor($http, $scope, socket, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    // this.carouselImages = [];
    this.listOng = [];
    this.midias = [];

    this.stepOptions = [
      {
        title: 'Confiança',
        desc: 'As organizações recomendadas são rigorosamente analisadas com base em impacto, gestão e transparência.',
        icon: '../../assets/images/main/icone1.png'
      },
      {
        title: 'Praticidade',
        desc: 'Você não precisa gastar horas pensando como, quanto ou quem ajudar. \
               Te ajudamos com isso: basta clicar e começar a fazer a diferença!',
        icon: '../../assets/images/main/icone2.png'
      },
      {
        title: 'Acompanhamento',
        desc: 'Transparência é muito importante para nós! Você acompanha o seu impacto positivo no Brasil e \
               recebe novidades sobre a organização que suporta.',
        icon: '../../assets/images/main/icone3.png'
      }
    ];

    this.carouselImages = [
      { src: '../../assets/images/renata/renata1.jpeg' },
      { src: '../../assets/images/renata/renata2.jpeg' },
      { src: '../../assets/images/renata/renata3.jpeg' },
      { src: '../../assets/images/renata/renata4.jpeg' },
    ];

    this.midias = [
      {
        src: '../../assets/images/midias/projetodraft2.png',
        link: 'http://projetodraft.com/a-doebem-quer-conectar-gente-disposta-a-ajudar-com-organizacoes-sociais-confiaveis/',
        alt: 'Projeto Draft'
      },
      {
        src: '../../assets/images/midias/awesomefoundation2.png',
        link: 'http://www.awesomefoundation.org/pt/projects/75390-doebem',
        alt: 'The Awesome Foundation'
      },
      {
        src: '../../assets/images/midias/nossacausa4.png',
        link: 'http://nossacausa.com/doebem-uma-nova-experiencia-de-doacao/',
        alt: 'Nossa Causa'
      },
      {
        src: '../../assets/images/midias/razoes2.png',
        link: 'http://razoesparaacreditar.com/apoie/ongs-doacao/',
        alt: 'Razoes Para Acreditar'
      },
      {
        src: '../../assets/images/midias/semcensura2.png',
        link: 'https://youtu.be/cbHXbvCF1FY',
        alt: 'Sem Censura'
      }
    ];
  }

  carregaLista() {
    this.$http.get(`api/ong/`)
      .then(res => {
        this.listOng = res.data;
      });
  }

  $onInit() {
    this.carregaLista();
  }
}


// export default angular.module('doebemOrgApp.renata', [ngRoute, contactForm])
export default angular.module('doebemOrgApp.renata', [ngRoute, 'jkAngularCarousel', contactForm])
  .config(routing)
  .component('renata', { template: require('./renata.pug'), controller: RenataController })
  .name;
