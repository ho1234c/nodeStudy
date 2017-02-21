export default class searchAddCtrl {
    constructor($rootScope, $state, $mdDialog, Search, Player, List, Session, Toast) {
        angular.extend(this, { $state, Search, Player, List, Session, Toast });
        this.date = new Date();
        this.mode = $state.params.id ? "edit" : "add";

        if (this.mode === "edit") {
            List.loadDetail($state.params.id)
                .then(result => {
                    const songInfo = JSON.parse(result.data.songInfo);
                    const imageUrl = $state.href('main.music-list', $state.params, {absolute: true}) + 'thumbnails/'+result.data.thumbnail;
                    const element = angular.element(document.getElementById('stored-image'));

                    List.initForm();
                    List.listForm.name = result.data.name;
                    List.listForm.detail = result.data.detail;
                    songInfo.forEach(value => { List.createdList.push(value); });
                    element.removeClass('ng-hide');
                    element.attr('src', imageUrl);
                });
        }

        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
            if (toState.name == 'main.search-add' || this.mode === 'add' || fromParams.skipAsync) {
                return;
            }
            else if (this.mode === 'edit') {
                event.preventDefault();
                const confirm = $mdDialog.confirm({ focusOnOpen: false })
                    .textContent('작성중이던 내용이 지워집니다. 계속하시겠습니까?')
                    .ok('계속')
                    .cancel('취소');

                $mdDialog.show(confirm).then(() => {
                    fromParams.skipAsync = true;
                    this.$state.go(toState.name)
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
    editList(list) {
        let msg = this.List.validation(list);

        if (msg == 'valid') {
            this.List.listForm.songInfo = this.List.createdList;
            this.List.edit(this.List.listForm, this.$state.params.id)
                .then(res => {
                    this.List.initForm();
                    list.$setUntouched();
                    this.Toast.success('수정되었습니다');
                    this.mode = 'add';
                    this.$state.go('main.search-add', {id: ""});
                }).catch(() => {
                    this.Toast.fail('수정에 실패했습니다');
                });
        }
        else {
            this.Toast.fail(msg);
        }
    }
    imageValidation(form){
        if(form.$error.maxSize){
            this.Toast.fail('이미지 사이즈가 너무 큽니다.');
        }
    }
}

searchAddCtrl.$inject = ['$rootScope', '$state', '$mdDialog', 'Search', 'Player', 'List', 'Session', 'Toast'];