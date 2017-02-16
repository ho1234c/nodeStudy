export default class mainCtrl {
    constructor(Session, $scope, $rootScope, $mdSidenav, Toast) {
        $scope.selectedIndex = 0;

        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            if (!Session.isLogin) {
                Toast.fail('로그인이 필요합니다.')
                    .then(() => {
                        event.preventDefault();
                    });
            }
            // prevent selectedIndex from changing even if the route change fails.
            if (fromState.name == 'main.search-add') {
                $scope.selectedIndex = 1;
            }else if(fromState.name == 'main.music-list'){
                $scope.selectedIndex = 0;
            }
        });

        // for binding ui-router state to md-tabs (url state may be different than shown, what is shown coincides with selectedIndex)
        $rootScope.$on('$stateChangeSuccess', (event, toState) => {
            if (toState.name == 'main.search-add') {
                $scope.selectedIndex = 1;
            } else if (toState.name == 'main.music-list') {
                $scope.selectedIndex = 0;
            }
        });
    }
}

mainCtrl.$inject = ['Session', '$scope', '$rootScope', '$mdSidenav', 'Toast'];
