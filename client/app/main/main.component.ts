const angular = require('angular');
const ngRoute = require('angular-route');

import routing from './main.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class MainController {
  $http;
  $scope;
  $location;
  stepOptions = [];
  listOng = [];
  midias = [];
  parceiros = [];


  /*@ngInject*/
  constructor($http, $scope, socket, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.listOng = [];
    this.midias = [];
    this.parceiros = [];

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

    this.midias = [
      {
        src: '../../assets/images/midias/awesomefoundation.png',
        link: 'http://www.awesomefoundation.org/pt/projects/75390-doebem',
        alt: 'The Awesome Foundation'
      },
      {
        src: '../../assets/images/midias/nossacausa.png',
        link: 'http://nossacausa.com/doebem-uma-nova-experiencia-de-doacao/',
        alt: 'Nossa Causa'
      },
      {
        src: '../../assets/images/midias/razoes.png',
        link: 'http://razoesparaacreditar.com/apoie/ongs-doacao/',
        alt: 'Razoes Para Acreditar'
      },
      {
        src: '../../assets/images/midias/semcensura.png',
        link: 'https://youtu.be/cbHXbvCF1FY',
        alt: 'Sem Censura'
      },               
      {
        src: '../../assets/images/midias/blastingnews.png',
        link: 'http://br.blastingnews.com/sociedade-opiniao/2017/06/doar-nunca-foi-tao-simples-e-transparente-001805969.html',
        alt: 'Blasting News'
      },
      {
        src: '../../assets/images/midias/ecommerce.png',
        link: 'https://www.ecommercebrasil.com.br/noticias/plataforma-doebem-quer-promover-nova-experiencia-de-doacao/',
        alt: 'Ecommerce'
      },
    ];

    this.parceiros = [
      {
        src: '../../assets/images/parceiros/google.png',
        link: 'https://www.google.com/nonprofits/',
        alt: 'Google for Nonprofits'
      },
      {
        src: '../../assets/images/parceiros/google2.png',
        link: 'https://www.google.com/grants/',
        alt: 'Google Ad Grants'
      },
      {
        src: '../../assets/images/parceiros/odw_logo_big.png',
        link: 'https://www.onedayswages.org/',
        alt: 'One Days Wages'
      },
      {
        src: '../../assets/images/parceiros/probono.png',
        link: 'http://www.probono.org.br/',
        alt: 'Instituto Pro Bono'
      },
      
    ]
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

export default angular.module('doebemOrgApp.main',
 [ngRoute, contactForm])
    .config(routing)
    .component('main', {
      template: require('./main.pug'),
      controller: MainController
    })
    .name;
