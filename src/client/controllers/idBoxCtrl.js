export default class idBoxCtrl {
    constructor($scope, Player, User, Session, List) {
        angular.extend(this, {$scope, Player, User, Session});
        this.$scope = $scope;
        this.List = List;

        this.isSelectedList = null;
        this.isSelectedSong = null;

        this.$scope.$on('highlighting', (event, msg) => {
            if(msg.index == -1){
                this.isSelectedSong = null;
            }
            else{
                if(msg.listname == 'playlist'){
                    this.isSelectedSong = msg.index;
                }
                else {
                    this.isSelectedSong = null;
                }
            }
        });
    }
    selectList(id){
        this.isSelectedSong = null;
        this.Player.playlist = [];
        this.Player.status.userListId = id;
        this.Player.highlighting(this.Player.status.listIndex, this.Player.status.listName);

        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for(const obj of songInfo){
                    this.Player.playlist.push(obj);
                }
            });
    }

    highlighting(index){
        this.isSelectedList = index;
    }

    login(){
        this.User.login(this.user)
            .then(data => {
                this.Session.set(data);
            });
    }

    logout(){
        this.User.logout()
            .then(result => {
                console.log(result);
                this.Session.destroy();
            });
    }

}

idBoxCtrl.$inject = ['$scope', 'Player', 'User', 'Session', 'List'];