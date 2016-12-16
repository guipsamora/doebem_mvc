const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './cad-ong.routes';
const ngFileUpload = require('ng-file-upload');

export class CadOngController {
  $http;
  $scope;
  $routeParams;
  $mdDialog;
  states =  [];
  listOng:  Object[];
  listAreas = [];
  listAreasDeAtuacao: Object[];
  ongForm;
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
    //this.s3Url = 'https://s3-sa-east-1.amazonaws.com/doebem';
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
        console.log(result, 'aprovou')
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
        clickOutsideToClose: false,
        fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(answer => {
        if (caller === 'logo') {
          console.log(answer, `${this.s3Url}/${this.listImages[answer]}`);
        this.ongForm.logo = `${this.s3Url}/${this.listImages[answer]}`;
        }
    });
  }

  buscaEnd(cep) {
   this.$http.get(`/api/BuscaCep/${cep}`)
     .then(res => {
       const end = JSON.parse(res.data.body);
       this.ongForm.logradouro = end.address.split('-')[0];
       this.ongForm.cidade = end.city;
       this.ongForm.estado = end.state;
     })
     .catch(err => console.log(err));
  }


  $onInit() {
    this.carregaLista();
    this.loadImages();
  }

  addOng(ongForm) {
    this.$http.post('api/ong', ongForm)
      .then(res => {console.log(res);}
    );
  }
}

DialogImagesController.$inject = ['$scope', '$mdDialog'];

function DialogImagesController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}


export default angular.module('doebemOrgApp.cadOng', [ngRoute, ngFileUpload, require('angular-input-masks')])
  .config(routing)
  .component('cadOng', {template: require('./cad-ong.pug'), controller: CadOngController})
  .name;
