import angular      from 'angular';

import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-resource';
import 'angular-material';
import 'angular-utils-pagination';
import 'angular-messages';
import 'ng-file-upload';

import listSvc          from './service/listSvc';
import userSvc          from './service/userSvc';
import playerSvc        from './service/playerSvc';
import searchSvc        from './service/searchSvc';
import * as common      from './service/commonSvc';
import mainCtrl         from './controllers/mainCtrl';
import listCtrl         from './controllers/listCtrl';
import idBoxCtrl        from './controllers/idBoxCtrl';
import searchAddCtrl    from './controllers/searchAddCtrl';
import signUpCtrl       from './controllers/signUpCtrl';
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
    .service('Session', common.Session)
    .service('Toast', common.Toast)
    .service('Search', searchSvc)
    .factory('httpInterceptors', common.httpInterceptors)
    .controller('mainCtrl', mainCtrl)
    .controller('listCtrl', listCtrl)
    .controller('idBoxCtrl', idBoxCtrl)
    .controller('searchAddCtrl', searchAddCtrl)
    .controller('signUpCtrl', signUpCtrl)
    .directive('youtube', ['$window', $window => new youtube($window)])
    .config($stateProvider => {
        $stateProvider
            .state('main', {
                views:{
                    main: {
                        url: '',
                        templateUrl: '/partials/main.html',
                        controller: 'mainCtrl',
                        controllerAs: 'vm'
                    },
                    idBox: {
                        url: '',
                        templateUrl: '/partials/id-box.html',
                        controller: 'idBoxCtrl',
                        controllerAs: 'vm'
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
            .state('idBox.main', {
                url: '',
                templateUrl: '/partials/id-box.html',
                controller: 'idBoxCtrl',
            })
            .state('idBox.signUp', {

            });
    })
    .config(config);