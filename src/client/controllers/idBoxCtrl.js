export default class idBoxCtrl {
    constructor($scope, Youtube) {
        angular.extend(this, {$scope, Youtube});
        this.$scope = $scope;
        this.Youtube = Youtube;

        this.isSelected = null;
        this.pageSize = 7;
        this.currentPage = 1;

        this.$scope.$on('videoChanged', (event, msg) => {
            if(msg.name == 'id-box'){
                this.isSelected = msg.index;
            }
            else if(msg.name == 'music-list-song'){
                this.isSelected = null;
            }
        });
    }

    selectedHighting(index){
        this.isSelected = index;
    }

}

idBoxCtrl.$inject = ['$scope', 'Youtube'];