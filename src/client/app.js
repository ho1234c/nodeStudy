import angular from 'angular';

import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-resource';
import 'angular-material';

import userCtrl from './controllers/userCtrl';
import listCtrl from './controllers/listCtrl';
import listSvc from './service/listSvc';
import userSvc from './service/userSvc';

// It is purpose to add css to javascript through webpack.
import './css/angular-material.scss';
import './css/style.scss';

angular
    .module('withSong', [ 'ui.router', 'ngResource', 'ngMaterial' ])
    .config($stateProvider => {
        $stateProvider
            .state('main', {
                url: "",
                abstract: true,
                templateUrl: 'main.html'
            })
            .state('main.music-list', {
                url: "",
                templateUrl: 'main.music-list.html',
                controller: "listCtrl",
                controllerAs : "vm",
                resolve: {
                    initList: ($resource) => {
                        return $resource('/load/list').get().$promise;
                    }
                }
            })
            .state('main.search-add', {
                url: "",
                templateUrl: 'main.search-add.html',
                controller: "searchAddCtrl"
            })
            .state('sign-up', {
                url: '/sign-up',
                templateUrl: 'sign-up.html',
                controller: 'userCtrl'
            });
    })
    .config($mdThemingProvider => {
        $mdThemingProvider.theme('default')
            .primaryPalette('deep-orange')
            .accentPalette('orange');
    })
    .service('List', listSvc)
    .service('User', userSvc)
    .controller('listCtrl', listCtrl)
    .controller('userCtrl', userCtrl)
