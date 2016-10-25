export default class idBoxCtrl {
    constructor($scope, Player, User, Session, List) {
        angular.extend(this, {$scope, Player, User, Session, List});
        this.$scope = $scope;

        this.isSelectedList = null;
        this.isSelectedSong = null;

        this.listStart = 0;
        this.listEnd = 4;

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

    listControl(dir){
        if(dir == 'up' && this.listStart > 0){
            this.listStart -= 5;
            this.listEnd -= 5;
        }else if(dir == 'down' && this.listEnd < this.Session.user.list.length - 1){
            this.listStart += 5;
            this.listEnd += 5;
        }
    }

    login(){
        this.User.login(this.user)
            .then(data => {
                this.Session.set(data);
                this.user = {};
            });
    }

    logout(){
        this.User.logout()
            .then(result => {
                this.Session.destroy();
                this.Player.playlist = [];
            });
    }

}

idBoxCtrl.$inject = ['$scope', 'Player', 'User', 'Session', 'List'];