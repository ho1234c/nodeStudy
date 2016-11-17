export default class idBoxCtrl {
    constructor(Player, User, Session, List, Search, Toast, $scope, $state) {
        angular.extend(this, {Player, User, Session, List, Search, Toast, $scope, $state});

        this.selectedList = null;
        this.selectedSong = null;
        this.listStart = 0;
        this.listEnd = 4;
        this.isShowSignUpForm = false;
        this.signUpForm = new User.userRequest();

        this.$scope.$on('highlighting', (event, msg) => {
            if(msg.index == -1){
                this.selectedSong = null;
            }
            else{
                if(msg.listname == 'playlist'){
                    this.selectedSong = msg.index;
                }
                else {
                    this.selectedSong = null;
                }
            }
        });
    }
    selectList(id){
        this.selectedSong = null;
        this.Player.playlist = [];
        this.Player.status.userListId = id;
        this.Player.highlighting(this.Player.status.listIndex, this.Player.status.listName);

        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for(const index in songInfo){
                    this.Player.playlist.push(songInfo[index]);
                }
            });
    }
    highlighting(index){
        this.selectedList = index;
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
        this.User.login(this.loginForm)
            .then(data => {
                this.isShowSignUpForm = false;
                this.Toast.success('Welcome!');
                this.Session.set(data);
                this.loginForm = {};
            })
            .catch(err => {
                this.Toast.fail(err);
            });
    }
    logout(){
        this.User.logout()
            .then(result => {
                this.Session.destroy();

                //init object related to user
                this.Player.playlist = [];
                this.List.initForm();
                this.Search.searchArray = [];
                this.$state.go('main.music-list');
            });
    }
    signUp(){
        this.isShowSignUpForm = false;

        this.signUpForm.$save(data => {
            this.Toast.success('가입완료');
            this.Session.set(data);
        });
    }
}

idBoxCtrl.$inject = ['Player', 'User', 'Session', 'List', 'Search', 'Toast', '$scope', '$state'];