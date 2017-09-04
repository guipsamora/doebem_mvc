const angular = require('angular');
const ngRoute = require('angular-route');
const uiBootstrap = require('angular-ui-bootstrap');
import routing from './duvidas.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class DuvidasController {
  $http;
  $scope;
  $routeParams;
  groups = [ ];
  org = [ ];
  link;
  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.groups = [
      {
        title: 'Quem são vocês?',
        desc: `A doebem, uma organização sem fins lucrativos, foi criada por Guilherme Samora e Elisa Mansur. 
        Somos ambos formados em Administração de Empresas e temos experiência 
        em diversas empresas nacionais e multinacionais e trabalhos sociais.`,
      },
      {
        title: 'Qual a intenção de vocês ao criar essa organização?',
        desc: `Queremos encontrar as melhores oportunidades de doação no Brasil. 
        Nosso objetivo é fazer com que mais brasileiros se sintam confortáveis em doar, ao saber que suas doações serão utilizadas de 
        maneira profissional e terão uma mudança real na vida das pessoas ajudadas.`,
      },
      // {
      //   title: 'Por que devo confiar em vocês?',
      //   desc: `Nossas análises possuem embasamento acadêmico e avaliação sobre o desempenho da organização. 
      //   Em nossa página de Transparência, compartilhamos nossos indicadores financeiros, planos, erros e aprendizados. 
      //   Além disso, somos independentes em nossa avaliação e repassamos 100%* do valor doado para a organização. 
      //   Após desconto do cartão de crédito.`,
      // },
      {
        title: 'Por que doar pela plataforma de vocês?',
        desc: `Ao doar pela doebem, conseguimos mensurar o impacto do nosso trabalho e medir a destinação das doações para cada causa. 
        Além disso, o usuário poderá acompanhar de forma periódica o impacto das suas doações.`
      },
      {
        title: 'Como vocês se sustentam?',
        desc: `Iniciamos a doebem com recursos de ambos os fundadores.
        Além disso, contamos com doações diretas de apoiadores que acreditam em nosso trabalho.`,
      },
      {
        title: 'Por que doar para uma organização social recomendada por vocês?',
        desc: `As organizações recomendadas por nós possuem impacto positivo, mensurado com base em estudos acadêmicos, muito maior do 
        que outras organizações brasileiras. Assim a mesma doação que você faria para outra organização possui muito mais valor e impacto 
        em uma das organizações recomendadas por nós. Além disso, avaliamos o profissionalismo em termos de gestão, equipe e transparência 
        financeira de cada uma das organizações sugeridas.`,
      },
      {
        title: 'Como vocês desenvolveram os critérios de análise das organizações?',
        desc: `Estudamos diferentes modelos de análise de causa e de organizações, como a GiveWell, Giving What We Can,
        Charity Navigator, entre outros, e elaboramos um conjunto de critérios - qualidade da gestão, transparência e impacto 
        - que fizesse sentido no contexto brasileiro.`,
      },
      {
        title: 'Quais fontes vocês utilizam para a busca das pesquisas e estudos?',
        desc: `Para encontrar pesqusisas, estudos e avaliações de impacto de programas sociais, utilizamos principalmente
        a GiveWell, o J-Pal, Cochrane e Campbell Collaboration`,
      },
      {
        title: 'Como saber se vocês não têm nenhuma relação com a organização?',
        desc: `Temos como política a avaliação imparcial, assim caso o colaborador tenha qualquer relacionamento prévio com a organização
         - como por exemplo, o voluntariado -, ele não poderá participar do processo de avaliação desta organização. 
        Além disso, será mencionado na avaliação caso qualquer membro da equipe da organização tenha qualquer relacionamento 
        com a organização avaliada `,
      },
      {
        title: 'Adorei o trabalho de vocês, como posso ajudar?',
        desc: `A melhor maneira de nos ajudar é fazendo uma doação para as organizações recomendadas por nós ou para a própria doebem. 
        Como segunda sugestão, você pode nos indicar para familiares e amigos ou mesmo outros doadores por meio de suas redes sociais. 
        Como terceira sugestão, você pode se candidatar para nossas vagas de voluntariado, sugerir ideias ou dar sugestões.`
      }
    ];

    this.org = [
      {
        title: 'Como faço para inscrever minha organização?',
        desc: `Por conta do nosso processo de estudo e análise, recomendamos apenas organizações com base em estudos de avaliação de impacto
        e análise da organização. Assim não é possível o cadastramento pela organização em nossa plataforma.
        Porém como compromisso de fortalecimento do setor encorajamos as organizações a entrarem em contato conosco e 
        mantermos um relacionamento.`,
      }
    ];    
  }

  $onInit() {
  }
}

export default angular.module('doebemOrgApp.duvidas', [ngRoute, uiBootstrap, contactForm])
  .config(routing).component('duvidas', {template: require('./duvidas.pug'),
  controller: DuvidasController
})
.name;
