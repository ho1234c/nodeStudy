export default class listCtrl {
    constructor($scope, List, initList, Player) {
        angular.extend(this, {$scope, List, initList, Player});
        this.$scope = $scope;
        this.List = List;
        this.musicList = initList.data;
        this.Player = Player;
        this.isSelectedList = null;
        this.isSelectedSong = null;

        this.$scope.$on('highlighting', (event, msg) => {
            if(msg.index === -1){
                this.isSelectedSong = null;
            }
            else{
                if(msg.listname == 'musicList'){
                    this.isSelectedList = msg.index;
                }
                else if(msg.listname == 'listDetail'){
                    this.isSelectedSong = msg.index;
                }
                else{
                    this.isSelectedSong = null;
                }
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
        this.Player.listDetail = [];
        this.isSelectedSong = null;
        this.Player.listDetailCurrentPage = 1;

        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for(const obj of songInfo){
                    this.Player.listDetail.push(obj);
                }
            });
    }
    listenList(id){
        this.Player.playlistCurrentPage = 1;
        this.Player.playlist = [];

        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for(const obj of songInfo){
                    this.Player.playlist.push(obj);
                }
            });
    }
}

listCtrl.$inject = ['$scope', 'List', 'initList', 'Player'];

