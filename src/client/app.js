import angular from 'angular';
import 'angular-ui-router';
import signUpController from './controllers/signUpController';
import './css/style.scss';

angular
    .module('app', [ 'ui.router' ])
    .config(function ($stateProvider) {
        $stateProvider.state('sign-up', {
                url: '/sign-up',
                templateUrl: 'sign-up.html',
                controller: 'signUpController'
            });
    })
.controller('signUpController', signUpController);
