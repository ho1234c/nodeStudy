import angular      from 'angular';
import nprogress    from 'nprogress';

import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-resource';
import 'angular-material';
import 'angular-utils-pagination';
import 'angular-messages';

import mainCtrl         from './controllers/mainCtrl';
import listCtrl         from './controllers/listCtrl';
import idBoxCtrl        from './controllers/idBoxCtrl';
import searchAddCtrl    from './controllers/searchAddCtrl';
import listSvc          from './service/listSvc';
import userSvc          from './service/userSvc';
import playerSvc        from './service/playerSvc';
import searchSvc        from './service/searchSvc';
import * as common      from './service/commonSvc';
import youtube          from './directives/youtube';
import config           from './config';

// It is purpose to add stylesheet to javascript using webpack.
import 'angular-material/angular-material.scss';
import './stylesheet/style.scss';

angular
    .module('withSong', [ 'ui.router', 'ngResource', 'ngMaterial', 'angularUtils.directives.dirPagination', 'ngSanitize', 'ngMessages' ])
    .service('List', listSvc)
    .service('User', userSvc)
    .service('Player', playerSvc)
    .service('Session', common.Session)
    .service('Toast', common.Toast)
    .service('Search', searchSvc)
    .service('httpInterceptors', common.httpInterceptors)
    .controller('mainCtrl', mainCtrl)
    .controller('listCtrl', listCtrl)
    .controller('idBoxCtrl', idBoxCtrl)
    .controller('searchAddCtrl', searchAddCtrl)
    .directive('youtube', ['$window', $window => new youtube($window)])
    .config($stateProvider => {
        $stateProvider
            .state('main', {
                abstract: true,
                views:{
                    main: {
                        url: '',
                        templateUrl: '/partials/main.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm'
                    },
                    idBox: {
                        url: '',
                        templateUrl: '/partials/id-box.html'
                    }
                },
            })
            .state('main.music-list', {
                url: '/',
                templateUrl: '/partials/main.music-list.html',
                controller: 'listCtrl',
                controllerAs : 'vm',
                resolve: {
                    initList: $resource => {
                        return $resource('/load/list').get().$promise;
                    }
                }
            })
            .state('main.search-add', {
                url: '/',
                templateUrl: '/partials/main.search-add.html',
                controller: 'searchAddCtrl',
                controllerAs : 'vm',
                resolve: {
                    isLogin: (Session, $q)=> {
                        const q = $q.defer();
                        if(Session.isLogin){
                            q.resolve();
                        }else{
                            q.reject();
                        }
                        return q.promise;
                    }
                }
            })
            .state('sign-up', {
                url: '/sign-up',
                templateUrl: '/partials/sign-up.html',
                controller: 'userCtrl'
            });
    })
    .config(config);