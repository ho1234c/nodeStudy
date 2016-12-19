export default class mainCtrl {
    constructor(Session, $scope, $rootScope, $mdSidenav, Toast) {
        $scope.selectedIndex = 0;

        // for binding ui-router state to md-tabs
        $rootScope.$on('$stateChangeStart', (event, toState) => {
            if(!Session.isLogin){
                if(toState.name == 'main.search-add'){
                    Toast.fail('로그인이 필요합니다.')
                        .then(() => {
                            $scope.selectedIndex = 0;
                            $mdSidenav('id-box').open();
                        })
                        .then(() => {
                            angular.element(angular.element(document.querySelectorAll('#id-box-open-btn'))).css('right', '240px');
                        });
                }
                else{
                    $scope.selectedIndex = 0;
                }
            }
        });
    }
}

mainCtrl.$inject = ['Session', '$scope', '$rootScope', '$mdSidenav', 'Toast'];
