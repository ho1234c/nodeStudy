export default class mainCtrl {
    constructor(Session, $timeout, $scope, $rootScope, $mdToast) {
        angular.extend(this, { Session, $timeout, $scope, $rootScope, $mdToast });

        // ui-router의 상태 변화에 따라서 md-tab의 상태를 변화시키기위함
        $rootScope.$on('$stateChangeStart', (event, toState) => {
            console.log(toState);
            if(!this.Session.isLogin){
                if(toState.name == 'main.search-add'){
                    $mdToast.show(
                        $mdToast.simple()
                            .parent(angular.element(document.querySelector('#id-box')))
                            .textContent('로그인이 필요합니다.')
                            .position('top')
                            .hideDelay(700)
                            .theme("success-toast"))
                        .then(() => {
                            this.$scope.selectedIndex = 0;
                        });
                }else{
                    this.$scope.selectedIndex = 0;
                }

            }
        });
    }
}

mainCtrl.$inject = ['Session', '$timeout', '$scope', '$rootScope', '$mdToast'];
