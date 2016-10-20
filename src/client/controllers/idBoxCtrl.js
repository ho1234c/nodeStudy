export default class idBoxCtrl {
    constructor($scope, Player) {
        angular.extend(this, {$scope, Player});
        this.$scope = $scope;
        this.Player = Player;

        this.isSelected = null;

        this.$scope.$on('highlighting', (event, msg) => {
            if(msg.index === -1){
                this.isSelected = null;
            }
            else{
                if(msg.listname == 'playlist'){
                    this.isSelected = msg.index;
                }
                else if(msg.listname == 'listDetail'){
                    this.isSelected = null;
                }
            }
        });
    }

}

idBoxCtrl.$inject = ['$scope', 'Player'];