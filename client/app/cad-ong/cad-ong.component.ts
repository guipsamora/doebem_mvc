const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './cad-ong.routes';
const ngFileUpload = require('ng-file-upload');

const DialogImagesController = ($scope, $mdDialog) => {
  $scope.hide = () => $mdDialog.hide();
  $scope.cancel = () => $mdDialog.cancel();
  $scope.answer = (answer) => $mdDialog.hide(answer);
};

DialogImagesController.$inject = ['$scope', '$mdDialog'];

export class CadOngController {
  $http;
  $scope;
  $routeParams;
  $mdDialog;
  states =  [];
  listOng:  Object[];
  listAreas = [];
  listAreasDeAtuacao: Object[];
  ongForm = {
    logo:  null as string ,
    backgroundImage:  null as string,
    linkPdf: null as string,
    logradouro: null as string,
    cidade: null as string,
    estado: null as string,
    imagens: []
  };
  ong = {};
  dialog;
  determinateValue;
  listImages: Object[];
  Upload;
  s3Url: String = 'https://s3-sa-east-1.amazonaws.com/doebem';
  /*@ngInject*/
  constructor($http, $scope, socket, $routeParams, $mdDialog, Upload) {
    this.$http = $http;
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;
    this.Upload = Upload;
    this.listAreasDeAtuacao = [
      { abbrev: 'educacao', desc: 'Educação' },
      { abbrev: 'saude', desc: 'Saúde' },
      { abbrev: 'combateAPobreza', desc: 'Combate à Probreza' }
    ];
  }

  loadImages() {
    this.$http.get('/api/imageGallery')
    .then(response => {
      this.listImages = response.data;
    });
  }

  carregaLista() {
   this.$http.get('api/ong')
      .then(res => {
        this.listOng = res.data;
      });
  }

  onFileSelect(files) {
    var filename = files.name;
    var type = files.type;
    var query = {
      filename: filename,
      type: type
    };
    this.$http.post('api/imageGallery/signing', query)
      .success(result => {
        console.log(result, 'aprovou');
        this.Upload.upload({
          url: result.url, //s3Url
          transformRequest: (data, headersGetter) => {
            var headers = headersGetter();
            delete headers.Authorization;
            return data;
          },
          fields: result.fields, //credentials
          method: 'POST',
          file: files
        })
        .progress(evt => {
          this.determinateValue = parseInt((100.0 * evt.loaded / evt.total).toString(), 10);
        })
        .success(data => {
          // file is uploaded successfully
          this.determinateValue = 0;
          this.loadImages();
          //this.angularGridInstance.gallery.refresh();
        })
        .error(err => {
          console.log('erro no cliente do s3', err);
        });
      })
      .error((data, status) => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('pau pau', data, status);
      });
  }

  handleUploadImage(caller, ev) {
    this.dialog = this.$mdDialog.show({
        scope: this.$scope,
        preserveScope: true,
        controller: DialogImagesController,
        templateUrl: 'selectImage.tmpl.pug',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
        // fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(answer => {
        switch (caller) {
          case 'logo':
            this.ongForm.logo = `${this.s3Url}/${this.listImages[answer]}`;
            break;
          case 'backgroundImage':
            this.ongForm.backgroundImage = `${this.s3Url}/${this.listImages[answer]}`;
            break;
          case 'imagens':
            this.ongForm.imagens.push({imagem: `${this.s3Url}/${this.listImages[answer]}`});
            break;
          case 'PDF':
            this.ongForm.linkPdf = `${this.s3Url}/${this.listImages[answer]}`;
            break;
          default:
            console.log('erro no handleUploadImage');
        }
    });
  }

  buscaEnd(cep) {
   console.log(cep);
   this.$http.get(`/api/BuscaCep/${cep}`)
     .then(res => {
       const end = JSON.parse(res.data.body);
        this.ongForm.logradouro = end.address.split('-')[0];
        this.ongForm.cidade = end.city;
        this.ongForm.estado = end.state;
        // bobeira
     })
     .catch(err => console.log(err));
  }


  $onInit() {
    this.carregaLista();
    this.loadImages();
  }

  addOng(form, ev) {
    console.log('Estive no addOng');
    this.$http.post('api/ong', form)
      .then(res => {
        this.dialog = this.$mdDialog.show({
          scope: this.$scope,
          preserveScope: true,
          controller: DialogImagesController,
          templateUrl: 'save.tmpl.pug',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          // fullscreen: this.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then( () => {
          this.ongForm = null;
          this.$scope.ongForm.$setPristine();
          this.$scope.ongForm.$setUntouched();
        });
    })
    .catch(err => console.log(err));
  }
}


export default angular.module('doebemOrgApp.cadOng', [ngRoute, ngFileUpload, require('angular-input-masks')])
  .config(routing)
  .component('cadOng', {template: require('./cad-ong.pug'), controller: CadOngController})
  .name;
