import angular from 'angular';

import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-resource';

import userCtrl from './controllers/userCtrl';
import listCtrl from './controllers/listCtrl';
import listSvc from './service/listSvc';
import userSvc from './service/userSvc';

// It is purpose to add css to javascript through webpack.
import './css/style.scss';

angular
    .module('withSong', [ 'ui.router' ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('music-list', {
                url: "",
                templateUrl: 'music-list.html',
                controller: "listCtrl"
            })

            .state('sign-up', {
                url: '/sign-up',
                templateUrl: 'sign-up.html',
                controller: 'userCtrl'
            });
    })
    .service('listSvc', listSvc)
    .service('userSvc', userSvc)
    .controller('listCtrl', listCtrl)
    .controller('userCtrl', userCtrl);
