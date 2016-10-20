import angular      from 'angular';

import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-resource';
import 'angular-material';
import 'angular-utils-pagination';

import listCtrl     from './controllers/listCtrl';
import idBoxCtrl    from './controllers/idBoxCtrl';
import listSvc      from './service/listSvc';
import userSvc      from './service/userSvc';
import playerSvc   from './service/playerSvc';
import youtube      from  './directives/youtube';

// It is purpose to add css to javascript through webpack.
import './css/angular-material.scss';
import './css/style.scss';

angular
    .module('withSong', [ 'ui.router', 'ngResource', 'ngMaterial', 'angularUtils.directives.dirPagination' ])
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
    .service('Player', playerSvc)
    .controller('listCtrl', listCtrl)
    .controller('idBoxCtrl', idBoxCtrl)
    .directive('youtube', ['$window', ($window) => new youtube($window)]);