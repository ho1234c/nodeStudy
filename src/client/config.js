export default function ($httpProvider, $locationProvider, $mdThemingProvider) {
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
