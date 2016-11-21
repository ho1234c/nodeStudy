import angular      from 'angular';

import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-resource';
import 'angular-material';
import 'angular-utils-pagination';
import 'angular-messages';
import 'ng-file-upload';

import commentSvc       from './service/commentSvc';
import listSvc          from './service/listSvc';
import * as misc        from './service/miscSvc';
import playerSvc        from './service/playerSvc';
import userSvc          from './service/userSvc';
import searchSvc        from './service/searchSvc';
import idBoxCtrl        from './controllers/idBoxCtrl';
import listCtrl         from './controllers/listCtrl';
import mainCtrl         from './controllers/mainCtrl';
import searchAddCtrl    from './controllers/searchAddCtrl';
import krInput          from './directives/krInput';
import youtube          from './directives/youtube';
import config           from './config';

// It is purpose to add stylesheet to javascript using webpack.
import 'angular-material/angular-material.scss';
import 'font-awesome/scss/font-awesome.scss';
import './stylesheet/style.scss';

angular
    .module('withSong', [ 'ui.router', 'ngResource', 'ngMaterial', 'angularUtils.directives.dirPagination', 'ngSanitize', 'ngMessages', 'ngFileUpload' ])
    .service('List', listSvc)
    .service('User', userSvc)
    .service('Player', playerSvc)
    .service('Session', misc.Session)
    .service('Toast', misc.Toast)
    .service('Search', searchSvc)
    .service('Comment', commentSvc)
    .factory('httpInterceptors', misc.httpInterceptors)
    .controller('mainCtrl', mainCtrl)
    .controller('listCtrl', listCtrl)
    .controller('idBoxCtrl', idBoxCtrl)
    .controller('searchAddCtrl', searchAddCtrl)
    .directive('youtube', ['$window', $window => new youtube($window)])
    .directive('krInput', () => new krInput())
    .config($stateProvider => {
        $stateProvider
            .state('main', {
                views:{
                    main: {
                        url: '',
                        templateUrl: '/partials/main.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm',
                    },
                    idBox: {
                        url: '',
                        templateUrl: '/partials/id-box.html',
                        controller: 'idBoxCtrl',
                        controllerAs: 'vm',
                    }
                },
                resolve: {
                    initSession: ['Session', Session => {
                        return Session.init;
                    }]
                }
            })
            .state('main.music-list', {
                url: '/',
                templateUrl: '/partials/main.music-list.html',
                controller: 'listCtrl',
                controllerAs : 'vm',
                resolve: {
                    initList: $resource => {
                        return $resource('/list').get().$promise;
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
            .state('idBox.main', {
                url: '',
                templateUrl: '/partials/id-box.html',
                controller: 'idBoxCtrl',
            })
            .state('idBox.signUp', {

            });
    })
    .config(config);