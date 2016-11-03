export default class mainCtrl {
    constructor(Session, $timeout, $scope, $rootScope, Toast) {
        angular.extend(this, { Session, $timeout, $scope, $rootScope, Toast });

        // for binding ui-router state to md-tabs
        $rootScope.$on('$stateChangeStart', (event, toState) => {
            if(!this.Session.isLogin){
                if(toState.name == 'main.search-add'){
                    this.Toast.fail('로그인이 필요합니다.')
                        .then(() => {
                            this.$scope.selectedIndex = 0;
                        });
                }
                else{
                    this.$scope.selectedIndex = 0;
                }
            }
        });
    }
}

mainCtrl.$inject = ['Session', '$timeout', '$scope', '$rootScope', 'Toast'];
