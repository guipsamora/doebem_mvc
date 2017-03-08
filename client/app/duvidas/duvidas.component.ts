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
        maneira profissional e terão um impacto real na vida das pessoas ajudadas. 
        Queremos assim ajudar a criar um país mais desenvolvido e com melhores condições de vida para as pessoas.`,
      },
      {
        title: 'Por que devo confiar em vocês?',
        desc: `Acreditamos na transparência e eficiência acima de tudo. 
        Todas as nossas análises possuem  embasamento acadêmico e avaliação sobre o desempenho da organização. 
        Você pode conferir nossa metodologia de avaliação na página metodologia. 
        No nosso blog você pode acompanhar nossa jornada e dar sua opinião. 
        Além disso, realizamos avaliações externas e compartilhamos nossos planos, erros e acertos na seguinte página.`,
      },
      {
        title: 'Como vocês se sustentam?',
        desc: `Iniciamos a doebem com um capital de ambos os fundadores, o que nos permitiu criar a organização. 
        No momento da doação para a instituição, o doador também pode optar por acrescentar 10% acima do valor doado, 
        que será destinado para a doebem. Além disso, contamos com doações diretas de apoiadores que acreditam na proposta da doebem.`,
      },
      {
        title: 'Por que doar para uma ONG recomendada por vocês?',
        desc: `As ONGs recomendadas por nós possuem impacto positivo, mensurado com base em estudos acadêmicos, 
        muito maior do que outras organizações. Assim a mesma doação que você faria para outra organização possui muito mais valor e 
        impacto em uma das organizações recomendadas por nós. Além disso, avaliamos o profissionalismo em termos de gestão, equipe e 
        transparência financeira de cada uma das organizações sugeridas.`,
      },
      {
        title: 'Como vocês desenvolveram os critérios de análise das organizações?',
        desc: `Estudamos diferentes modelos de análise de causa e de organizações, como a GiveWell, Giving What We Can, 
        Charity Navigator, entre outros, e elaboramos um set de critérios - qualidade da gestão, transparência e impacto - 
        que fizesse sentido no contexto brasileiro.`,
      },
      {
        title: 'Por que doar pela plataforma de vocês?',
        desc: `Ao doar pela doebem, conseguimos mensurar o impacto do nosso trabalho e medir a destinação das doações para cada causa. 
        Além disso o usuário, ao doar pela nossa plataforma, 
        terá acesso a um acompanhamento personalizado sobre o impacto das suas doações.`
      },
      {
        title: 'Como saber se vocês não têm nenhuma relação com a organização?',
        desc: `Temos como política a avaliação imparcial, assim caso o avaliador tenha qualquer relacionamento prévio com a organização - 
        como por exemplo, o voluntariado -, ele não poderá participar do processo de avaliação desta organização.`,
      },
      {
        title: 'Vocês não estão prejudicando outras organizações?',
        desc: `Acreditamos que diferentes pessoas possuem diferentes motivações e preocupações ao fazer uma doação. De acordo com pesquisa 
        realizada pelo IDIS - Instituto de Desenvolvimento do Investimento Social com dados de 2015, dentre os principais motivos que 
        inibem as pessoas de doarem estão a desconfiança nas organizações e más experiências na doação, e são esses os problemas que 
        queremos resolver. Assim acreditamos que com nosso trabalho mais pessoas estarão dispostas a doar e, consequentemente, 
        estaremos ajudando a promover um maior impacto positivo.`,
      },
      {
        title: 'Adorei o trabalho de vocês, como posso ajudar?',
        desc: `A melhor maneira de nos ajudar é fazer uma doação para as organizações recomendadas por nós ou para a própria doebem. 
        Como segunda opção você pode nos indicar para familiares e amigos ou mesmo outros doadores por meio de suas redes sociais. 
        Como terceira opção você pode se candidatar para nossas vagas de emprego, sugerir ideias ou dar feedback.`
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
