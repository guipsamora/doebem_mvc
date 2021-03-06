const angular = require('angular');
const ngRoute = require('angular-route');
const ngSanitize = require('angular-sanitize');
const uiBootstrap = require('angular-ui-bootstrap');
import routing from './duvidas.routes';
import contactForm from '../../components/contact-form/contact-form.component';

export class DuvidasController {
  $http;
  $scope;
  $routeParams;
  $sce;
  groups = [ ];
  org = [ ];
  teste = [ ];
  link;
  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $sce) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$sce = $sce;
    this.groups = [
      {
        title: 'Quem são vocês?',
        desc: `A doebem, uma organização sem fins lucrativos, foi criada por <a href=\"https://br.linkedin.com/in/guisamora\"
        target=\"_blank\">Guilherme Samora</a> e <a href=\"https://www.linkedin.com/in/elisa-de-rooij-mansur-30435854/en\"
        target=\"_blank\">Elisa Mansur</a>. Somos ambos formados em Administração de Empresas e temos experiência 
        em diversas empresas nacionais e multinacionais e trabalhos sociais.`,
      },
      {
        title: 'Qual a intenção de vocês ao criar essa organização?',
        desc: `Queremos encontrar as melhores oportunidades de doação no Brasil. 
        Nosso objetivo é fazer com que mais brasileiros se sintam confortáveis em doar, ao saber que suas doações serão utilizadas de 
        maneira profissional e terão uma mudança real na vida das pessoas ajudadas.`,
      },
      {
        title: 'Por que devo confiar em vocês?',
        desc: `Nossas análises possuem embasamento acadêmico e avaliação sobre o desempenho da organização. 
        Em nossa página de Transparência, compartilhamos nossos indicadores financeiros, planos, erros e aprendizados. 
        Além disso, somos independentes em nossa avaliação e repassamos 100%<strong>*</strong> do valor doado para a organização. 
        </br></br><strong>*</strong>Após desconto do cartão de crédito.`,
      },
      {
        title: 'Quais modos de pagamento vocês aceitam?',
        desc: `Pelo site aceitamos pagamentos por cartão de crédito e boleto. Caso você deseje realizar uma transferência nossos
        dados bancários são: </br><strong>Razão Social:</strong> doebem - Doações Efetivas</br>
        <strong>CNPJ:</strong> 27.129.904/0001-78</br>
        <strong>Banco:</strong> 341 - Itaú</br>
        <strong>Agência:</strong> 0062</br>
        <strong>Conta Corrente:</strong> 11281-8`
      },
      {
        title: 'Por que doar pela plataforma de vocês?',
        desc: `Ao doar pela doebem, conseguimos mensurar o impacto do nosso trabalho e medir a destinação das doações para cada causa. 
        Além disso, o usuário poderá acompanhar de forma periódica o impacto das suas doações.`
      },
      {
        title: 'Como vocês se sustentam?',
        desc: `Iniciamos a doebem com recursos de ambos os fundadores.
        Além disso, contamos com doações diretas de apoiadores que acreditam em nosso trabalho.
        Caso você queira colaborar conosco no momento da sua doação você pode acrescentar mais 10% 
        que irão para nossos custos operacionais.`,
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
        desc: `Estudamos diferentes modelos de análise de causa e de organizações, como a <a href=\"https://www.givewell.org\"
        target=\"_blank\">GiveWell</a>,<a href=\"https://www.givingwhatwecan.org/\" target=\"_blank\"> Giving What We Can</a>,
        <a href=\"https://www.charitynavigator.org/\" target=\"_blank\"> Charity Navigator</a>, entre outros, e elaboramos um
         conjunto de critérios - qualidade da gestão, transparência e impacto - que fizesse sentido no contexto brasileiro.`,
      },
      {
        title: 'Quais fontes vocês utilizam para a busca das pesquisas e estudos?',
        desc: `Para encontrar pesqusisas, estudos e avaliações de impacto de programas sociais, utilizamos principalmente
        a <a href=\"https://www.givewell.org\" target=\"_blank\"> GiveWell</a>, o <a href=\"https://www.povertyactionlab.org/\"
        target=\"_blank\"> J-Pal</a>,<a href=\"http://www.cochrane.org/\" target=\"_blank\"> Cochrane </a> e 
        <a href=\"https://www.campbellcollaboration.org\" target=\"_blank\"> Campbell Collaboration</a>.`,
      },
      {
        title: 'Como saber se vocês não têm nenhuma relação com a organização?',
        desc: `Temos como política a avaliação imparcial, assim caso o colaborador tenha qualquer relacionamento prévio com a organização
         - por exemplo, o voluntariado - ele não poderá participar do processo de avaliação desta organização. 
        Além disso, será mencionado na avaliação caso qualquer membro da equipe da organização tenha qualquer relacionamento 
        com a organização avaliada.`,
      },
      {
        title: 'Adorei o trabalho de vocês, como posso ajudar?',
        desc: `A melhor maneira de nos ajudar é fazendo uma doação para as organizações recomendadas por nós ou para a própria doebem. 
        Como segunda sugestão, você pode nos indicar para familiares e amigos ou mesmo outros doadores por meio de suas redes sociais. 
        Como terceira sugestão, você pode se candidatar para nossas vagas de voluntariado, sugerir ideias ou dar sugestões.`
      },
      {
        title: 'O que significa fazer uma doação para "a critério da doebem"?',
        desc: `"A critério da doebem" significa que iremos fazer a escolha da organização para qual a doação será destinada com base em 
                nossos critérios e conversas com as rganizações. Essa é uma opção para facilitar sua experiência de doação, 
                caso você não tenha nenhuma organização preferencial.`
      }
    ];

    this.org = [
      {
        title: 'Como faço para inscrever minha organização?',
        desc: `Por conta do nosso processo de estudo e análise, recomendamos apenas organizações 
        com base em estudos de avaliação de impacto e análise da organização. Assim não é possível o cadastramento 
        pela organização em nossa plataforma. Porém como compromisso de fortalecimento do setor encorajamos as organizações 
        a entrarem em contato conosco e mantermos um relacionamento.`,
      }
    ];
  }

  $onInit() {
  };
}

export default angular.module('doebemOrgApp.duvidas', [ngRoute, uiBootstrap, ngSanitize, contactForm])
  .filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
  }])
  .config(routing).component('duvidas', {template: require('./duvidas.pug'),
  controller: DuvidasController
})
.name;
