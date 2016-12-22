export default class listCtrl {
    constructor($rootScope, $window, initList, Player, List, Session, Toast, Comment) {
        angular.extend(this, { initList, Player, List, Session, Toast, Comment});

        // only first time
        if(this.List.musicList.length === 0){
            this.List.musicList = initList.data;
        }

        // for highlighting control
        this.selectedList = this.List.selectedIndex;
        this.selectedSong = this.Player.status.listName == 'listDetail' ? this.Player.status.listIndex : null;

        this.isShowComment = true;
        this.commetOrderBy = 'createdAt';

        $rootScope.$on('highlighting', (event, msg) => {
            if(msg.index === -1){
                this.selectedSong = null;
            }
            else{
                if(msg.listname == 'listDetail'){
                    this.selectedSong = msg.index;
                }
                else {
                    this.selectedSong = null;
                }
            }
        });

        $rootScope.$watch(() => angular.element($window)[0].innerHeight, (newVal, oldVal) => {
            if(newVal > 1000) {
                this.isShowComment = true;
            }
        });
    }
    loadList(watchMore){
        if(!watchMore){
            this.List.musicList = [];
        }
        this.List.load(this.List.musicList.length)
            .then(result => {
                for(const index in result.data){
                    this.List.musicList.push(result.data[index]);
                }
            });
    }
    selectList(id, index){
        this.selectedSong = null;

        this.Comment.listId = id;
        this.Player.listDetailCurrentPage = 1;
        this.Player.status.musicListId = id;

        // for highlighting
        this.List.selectedIndex = index;
        this.selectedList = index;

        this.Player.highlighting(this.Player.status.listIndex, this.Player.status.listName);

        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                const comments = result.data.Comments;

                this.Player.listDetail = [];
                for(const index in songInfo){
                    this.Player.listDetail.push(songInfo[index]);
                }
                this.Comment.commentList = [];
                for(const index in comments){
                    this.Comment.commentList.push(comments[index]);
                }
                this.changeCommentOrder();
            });
    }
    changeListOrder(){
        this.List.musicList = [];
        this.Player.listDetail = [];
        this.Comment.commentList = [];
        this.selectedList = null;
        this.selectedSong = null;

        this.List.load()
            .then(result => {
                for(const index in result.data){
                    this.List.musicList.push(result.data[index]);
                }
            });
    }
    likeToggle(element){
        if(!this.Session.isLogin){
            this.Toast.fail('로그인이 필요합니다');
            return;
        }
        element.hover = !element.hover; // because when click to target, it was fired mouse enter and mouse leave event.
        if(element.item.isLike){
            this.List.like(element.item.id, 'decrement')
                .then(() => {
                    this.Session.user.list = this.Session.user.list.filter(obj => obj.id != element.item.id);
                    element.item.like -= 1;
                });
        }
        else{
            this.List.like(element.item.id, 'increment')
                .then(result => {
                    this.Session.user.list.push(element.item);
                    element.item.like += 1;
                });
        }
        element.item.isLike = !element.item.isLike;
    }
    submitComment(){
        if(!this.Session.isLogin){
            this.Toast.fail('로그인해주세요');
            return;
        }

        if(this.Comment.content.length === 0){
            this.Toast.fail('댓글을 입력해 주세요');
            return;
        }
        else if(this.Comment.content.length > 90){
            this.Toast.fail('90자 미만으로 입력해주세요');
            return;
        }
        this.Comment.create({
            content: this.Comment.content,
            writerId: this.Session.user.id,
            listId: this.Comment.listId
        }).then(result => {
            result.data.User = this.Session.user;
            this.Comment.commentList.push(result.data);
            this.Comment.content = "";
            this.changeCommentOrder();
        });
    }
    changeCommentOrder(){
        this.Comment.commentList.sort((a, b) => {
            return new Date(b[this.commetOrderBy]) - new Date(a[this.commetOrderBy]);
        });
    }
    likeCommentToggle(element){
        if(!this.Session.isLogin){
            this.Toast.fail('로그인이 필요합니다');
            return;
        }
        element.hover = !element.hover; // because when click to target, it was fired mouse enter and mouse leave event.
        if(element.item.isLike){
            this.Comment.like(element.item.id, 'decrement')
                .then(() => {
                    this.Session.user.comment = this.Session.user.comment.filter(obj => obj.id != element.item.id);
                    element.item.like -= 1;
                });
        }
        else{
            this.Comment.like(element.item.id, 'increment')
                .then(result => {
                    this.Session.user.comment.push(element.item);
                    element.item.like += 1;
                });
        }
        element.item.isLike = !element.item.isLike;
    }
    searchList(){
        if(!this.List.searchWord){
            this.List.musicList = [];
        }
        this.List.load(this.List.musicList.length)
            .then(result => {
                for(const index in result.data){
                    this.List.musicList.push(result.data[index]);
                }
            });
    }
}

listCtrl.$inject = ['$rootScope', '$window', 'initList', 'Player', 'List', 'Session', 'Toast', 'Comment'];

