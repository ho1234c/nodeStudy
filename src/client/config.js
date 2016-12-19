export function miscConfig($httpProvider, $locationProvider, $mdThemingProvider) {
    // http interceptor
    $httpProvider.interceptors.push('httpInterceptors');

    // for pretty url
    $locationProvider.html5Mode(true);

    // angular material theme setting
    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('orange');
    $mdThemingProvider.theme('success-toast');
    $mdThemingProvider.theme('fail-toast');
}

export function routeConfig($stateProvider){
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
        });
}