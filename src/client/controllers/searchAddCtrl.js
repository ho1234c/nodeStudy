export default class searchAddCtrl {
    constructor($rootScope, $stateParams, $state, $mdDialog, Search, Player, List, Session, Toast) {
        angular.extend(this, { $stateParams, Search, Player, List, Session, Toast });
        this.date = new Date();
        this.mode = $stateParams.id ? "edit" : "add";
        if (this.mode === "edit") {
            List.loadDetail($stateParams.id)
                .then(result => {
                    const songInfo = JSON.parse(result.data.songInfo);

                    List.initForm();
                    List.listForm.name = result.data.name;
                    List.listForm.detail = result.data.detail;
                    List.listForm.thumbnail = '/thumbnails/' + result.data.thumbnail;
                    for (const index in songInfo) {
                        List.createdList.push(songInfo[index]);
                    }
                });
        }

        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
            if (toState.name == 'main.search-add' || this.mode === 'add' || fromParams.skipAsync) {
                return;
            }
            if (this.mode === 'edit') {
                event.preventDefault();
                const confirm = $mdDialog.confirm({ focusOnOpen: false })
                    .textContent('작성중이던 내용을 잃어버릴 수 있습니다. 계속하시겠습니까?')
                    .ok('계속')
                    .cancel('취소');

                $mdDialog.show(confirm).then(() => {
                    fromParams.skipAsync = true;
                    $state.go(toState.name)
                        .then(() => {
                            this.mode = 'add';
                            this.List.initForm();
                        });
                }, () => {
                    Toast.fail('취소되었습니다.');
                });
            }
        });
    }
    search() {
        this.Search.searchArray = [];
        if (!this.Search.searchWord) {
            this.Toast.fail('검색어를 입력해주세요');
            return;
        }
        this.Search.searchVideo(this.Search.searchWord)
            .then(result => {
                for (const index in result.data) {
                    this.Search.searchArray.push(result.data[index]);
                }
                this.Search.nextPageToken = result.nextPageToken;
            });
    }
    searchMore() {
        this.Search.searchVideo(this.Search.searchWord, this.Search.nextPageToken)
            .then(result => {
                for (const index in result.data) {
                    this.Search.searchArray.push(result.data[index]);
                }
                this.Search.nextPageToken = result.nextPageToken;
            });
    }
    playVideo(id) {
        this.Player.videoid = id;
    }
    insertSong(obj) {
        this.List.createdList.push(obj);
    }
    removeSong(index) {
        this.List.createdList.splice(index, 1);
    }
    createList(list) {
        let msg = this.List.validation(list);
        if (msg == 'valid') {
            this.List.listForm.songInfo = this.List.createdList;
            this.List.listForm.makerId = this.Session.user.id;
            this.List.create(this.List.listForm)
                .then(res => {
                    this.List.initForm();
                    list.$setUntouched();
                    this.Toast.success('등록되었습니다');
                }).catch(() => {
                    this.Toast.fail('등록에 실패했습니다');
                });
        }
        else {
            this.Toast.fail(msg);
        }
    }
}

searchAddCtrl.$inject = ['$rootScope', '$stateParams', '$state', '$mdDialog', 'Search', 'Player', 'List', 'Session', 'Toast'];