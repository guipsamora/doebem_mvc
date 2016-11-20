'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
const ngMaterial = require('angular-material');

export class NavbarComponent {

  menu = [{
    'title': 'COMO FUNCIONA ',
    'link': ''
  }, {
    'title': 'CAUSAS ',
    'link': 'causas'
  }, {
    'title': 'METODOLOGIA ',
    'link': 'metodologia'
  }, {
    'title': 'SOBRE ',
    'link': 'sobre'
  }, {
    'title': 'BLOG ',
    'link': '/'
  }, {
    'title': 'CONTATO ',
    'link': 'contato'
  }];

  $location;
  anchorSmoothScroll;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  constructor($location, Auth,  anchorSmoothScroll) {
    'ngInject';
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.anchorSmoothScroll = anchorSmoothScroll;
  }

  isActive(route) {
    return route === this.$location.path();
  }

  goToElement(eID) {
    console.log(this.$location.url());
    this.$location.hash(eID);
    this.anchorSmoothScroll.scrollTo(eID);
  }
}

export default angular.module('directives.navbar', [ngMaterial])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) {
              return self.pageYOffset;
            }
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop) {
                return document.documentElement.scrollTop;
              }
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) {
              return document.body.scrollTop;
            }
            return 0;
        }

        //pega a posicao vertical do elemento
        function elmYPosition(eID) {
          //define o elemento
            var node: HTMLElement;
            var elm: HTMLElement;

            elm = document.getElementById(eID);
            //pega a posiçao em relacao ao topo
            var y = elm.offsetTop;
            //passa o elemento
            node = elm;
            while (node.offsetParent && node.offsetParent !== document.body) {
                //aqui que esta a burrada////

                node = node.offsetParent;
                y += node.offsetTop;
            }
            return y;
        }

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;

        console.log('eID is: ' + eID);
        console.log('startY is: ' + startY);
        console.log('stopY is: ' + stopY);
        console.log('distance is: ' + distance);

        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        // var speed = Math.round(distance / 100);
        // if (speed >= 20) speed = 20;
        // speed = 1;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 800;
        // console.log("Speed is:" + speed);
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer);
                leapY += step;
                if (leapY > stopY) {
                  leapY = stopY; timer++;
                }
            }
            return;
        }

        for ( var i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer);
            leapY -= step;
            if (leapY < stopY) {
              leapY = stopY;
            }
            timer++;
        }
    };
  })
  .name;

