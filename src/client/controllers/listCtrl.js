export default class listCtrl {
    constructor($scope, List, initList, Youtube) {
        angular.extend(this, {$scope, List, initList, Youtube});
        this.$scope = $scope;
        this.List = List;
        this.musicList = initList.data;
        this.Youtube = Youtube;
        this.detail = [];
        this.isSelectedList = null;
        this.isSelectedSong = null;

        this.pageSize = 7;
        this.currentPage = 1;

        this.$scope.$on('videoChanged', (event, msg) => {
            if(msg.name == 'music-list-list'){
                this.isSelectedList = msg.index;
            }
            else if(msg.name == 'music-list-song'){
                this.isSelectedSong = msg.index;
            }
            else{
                this.isSelectedSong = null;
            }
        });
    }
    watchMore(count){
        this.List.loadList(count)
            .then(result => {
                for(const obj of result.data){
                    this.musicList.push(obj);
                }
            });
    }
    selectList(id){
        this.detail = [];
        this.isSelectedSong = null;

        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for(const obj of songInfo){
                    this.detail.push(obj);
                }
            });
    }
    listenList(id){
        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for(const obj of songInfo){
                    this.Youtube.playlist.push(obj);
                }
            });
    }
}

listCtrl.$inject = ['$scope', 'List', 'initList', 'Youtube'];

