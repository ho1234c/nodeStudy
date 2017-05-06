export default class idBoxCtrl {
    constructor(Player, User, Session, List, Search, Toast, $scope, $state, $mdSidenav, $window) {
        angular.extend(this, { Player, User, Session, List, Search, Toast, $scope, $state, $mdSidenav, $window });

        this.selectedListName = null;
        this.selectedSong = null;
        this.listStart = 0;
        this.listEnd = 4;
        this.isShowSignUpForm = false;
        this.signUpForm = new User.userRequest();

        this.$scope.$on('highlighting', (event, msg) => {
            if (msg.index == -1) {
                this.selectedSong = null;
            }
            else {
                if (msg.listname == 'playlist') {
                    this.selectedSong = msg.index;
                }
                else {
                    this.selectedSong = null;
                }
            }
        });
    }
    selectList(item) {
        this.selectedSong = null;
        this.Player.playlist = [];
        this.Player.status.userListId = item.id;
        this.Player.highlighting(this.Player.status.listIndex, this.Player.status.listName);
        this.selectedListName = item.name;

        this.List.loadDetail(item.id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for (const index in songInfo) {
                    this.Player.playlist.push(songInfo[index]);
                }
            });
    }
    listControl(dir) {
        if (dir == 'up' && this.listStart > 0) {
            this.listStart -= 5;
            this.listEnd -= 5;
        } else if (dir == 'down' && this.listEnd < this.Session.user.list.length - 1) {
            this.listStart += 5;
            this.listEnd += 5;
        }
    }
    login() {
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
    logout() {
        this.User.logout()
            .then(result => {
                this.Session.destroy();
                this.Player.playlist = []; //init object related to user
                this.List.initForm();
                this.Search.searchArray = [];
                this.$state.go('main.music-list');
            });
    }
    signUp() {
        this.isShowSignUpForm = false;

        this.signUpForm.$save(data => {
            this.Toast.success('가입완료');
            this.Session.set(data);
        });
    }
    toggleIdBox() {
        if (this.$mdSidenav('id-box').isOpen()) {
            angular.element(angular.element(document.querySelectorAll('#id-box-wrap'))).css('position', 'fixed');
            this.$mdSidenav('id-box').close()
                .then(() => {
                    angular.element(angular.element(document.querySelectorAll('#id-box-open-btn'))).css('right', '20px');
                });
        }
        else {
            angular.element(angular.element(document.querySelectorAll('#id-box-wrap'))).css('position', 'inherit');
            this.$mdSidenav('id-box').open()
                .then(() => {
                    angular.element(angular.element(document.querySelectorAll('#id-box-open-btn'))).css('right', '240px');
                });
        }
    }
    facebookLogin() {
        this.$window.location.assign('/user/login/facebook');
    }
    removeList(id, index) {
        this.List.like(id, 'decrement')
            .then(() => {
                this.Session.user.list.splice(index, 1);
                this.List.musicList.forEach(obj => {
                    if (obj.id == id) {
                        obj.isLike = false;
                    }
                });
                this.Toast.success('제거되었습니다.');
            })
            .catch(() => {
                this.Toast.fail('목록을 제거하는데 실패했습니다.');
            });
    }
}

idBoxCtrl.$inject = ['Player', 'User', 'Session', 'List', 'Search', 'Toast', '$scope', '$state', '$mdSidenav', '$window'];