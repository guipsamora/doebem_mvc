const angular = require('angular');
const ngRoute = require('angular-route');
const slugifier = require('wb-angular-slugify');

import routing from './cad-ong.routes';

export class CadOngController {
  $http;
  $scope;
  $routeParams;
  states =  [];
  listOng = [];
  listAreas = [];
  listAreasDeAtuacao = [];
  ongForm;
  ong = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;

    this.states = [{
        ID: '1',
        Sigla: 'AC',
        Nome: 'Acre'
      },
      {
        ID: '2',
        Sigla: 'AL',
        Nome: 'Alagoas'
      },
      {
        ID: '3',
        Sigla: 'AM',
        Nome: 'Amazonas'
      },
      {
        ID: '4',
        Sigla: 'AP',
        Nome: 'Amapá'
      },
      {
        ID: '5',
        Sigla: 'BA',
        Nome: 'Bahia'
      },
      {
        ID: '6',
        Sigla: 'CE',
        Nome: 'Ceará'
      },
      {
        ID: '7',
        Sigla: 'DF',
        Nome: 'Distrito Federal'
      },
      {
        ID: '8',
        Sigla: 'ES',
        Nome: 'Espírito Santo'
      },
      {
        ID: '9',
        Sigla: 'GO',
        Nome: 'Goiás'
      },
      {
        ID: '10',
        Sigla: 'MA',
        Nome: 'Maranhão'
      },
      {
        ID: '11',
        Sigla: 'MG',
        Nome: 'Minas Gerais'
      },
      {
        ID: '12',
        Sigla: 'MS',
        Nome: 'Mato Grosso do Sul'
      },
      {
        ID: '13',
        Sigla: 'MT',
        Nome: 'Mato Grosso'
      },
      {
        ID: '14',
        Sigla: 'PA',
        Nome: 'Pará'
      },
      {
        ID: '15',
        Sigla: 'PB',
        Nome: 'Paraíba'
      },
      {
        ID: '16',
        Sigla: 'PE',
        Nome: 'Pernambuco'
      },
      {
        ID: '17',
        Sigla: 'PI',
        Nome: 'Piauí'
      },
      {
        ID: '18',
        Sigla: 'PR',
        Nome: 'Paraná'
      },
      {
        ID: '19',
        Sigla: 'RJ',
        Nome: 'Rio de Janeiro'
      },
      {
        ID: '20',
        Sigla: 'RN',
        Nome: 'Rio Grande do Norte'
      },
      {
        ID: '21',
        Sigla: 'RO',
        Nome: 'Rondônia'
      },
      {
        ID: '22',
        Sigla: 'RR',
        Nome: 'Roraima'
      },
      {
        ID: '23',
        Sigla: 'RS',
        Nome: 'Rio Grande do Sul'
      },
      {
        ID: '24',
        Sigla: 'SC',
        Nome: 'Santa Catarina'
      },
      {
        ID: '25',
        Sigla: 'SE',
        Nome: 'Sergipe'
      },
      {
        ID: '26',
        Sigla: 'SP',
        Nome: 'São Paulo'
      },
      {
        ID: '27',
        Sigla: 'TO',
        Nome: 'Tocantins'
    }];

    this.listAreasDeAtuacao = [
      { abbrev: 'educacao', desc: 'Educação' },
      { abbrev: 'saude', desc: 'Saúde' },
      { abbrev: 'combateAProbreza', desc: 'Combate A Probreza' }
    ];
  }

 carregaLista() {
   this.$http.get('api/ong')
      .then(res => {
        this.listOng = res.data;
      });
  }

 buscaEnd(cep) {

   this.$http.get(`/api/BuscaCep/${cep}`)
     .then(res => {
       const end = JSON.parse(res.data.body);
       console.log(res.data.body);
       this.ongForm.logradouro = end.address.split('-')[0];
       this.ongForm.cidade = end.city;
       this.ongForm.estado = end.state;
     })
     .catch(err => console.log(err));
  }

  $onInit() {
    this.carregaLista();
  }

  addOng(ongForm) {
    this.$http.post('api/ong', ongForm)
      .then(res => { console.log(res) });
  }
}

export default angular.module('doebemOrgApp.cadOng', [ngRoute, require('angular-input-masks'), 'slugifier'])
  .config(routing)
  .component('cadOng',{template: require('./cad-ong.pug'), controller: CadOngController})
  .name;
