export default class listCtrl {
    constructor($rootScope, $window, initList, Player, List, Session, Toast, Comment) {
        angular.extend(this, {$window, initList, Player, List, Session, Toast, Comment});

        // only first time
        if(this.List.musicList.length === 0){
            this.List.musicList = initList.data;
        }

        // for highlighting control
        this.selectedList = this.List.selectedIndex;
        this.selectedSong = this.Player.status.listName == 'listDetail' ? this.Player.status.listIndex : null;

        this.commentContent = "";
        this.isShowComment = true;

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
    }
    watchMore(order){
        this.List.loadList(this.List.musicList.length, order)
            .then(result => {
                for(const index in result.data){
                    this.List.musicList.push(result.data[index]);
                }
            });
    }
    selectList(id, index){
        this.selectedSong = null;

        // init status
        this.Player.listDetail = [];
        this.Comment.commentList = [];
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

                for(const index in songInfo){
                    this.Player.listDetail.push(songInfo[index]);
                }
                for(const index in comments){
                    this.Comment.commentList.push(comments[index]);
                }
            });
    }
    changeListOrder(){
        this.List.musicList = [];
        this.Player.listDetail = [];
        this.selectedList = null;
        this.selectedSong = null;

        this.List.loadList()
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

        element.hover = !element.hover; // because when click to target, it fired mouse enter and mouse leave event.
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
    toggleBottomSheet(){
        if(!this.isShowBottomSheet){

        }
        else{

        }
        this.isShowBottomSheet = !this.isShowBottomSheet;
    }
    commentSubmit(){

    }
}

listCtrl.$inject = ['$rootScope', '$window', 'initList', 'Player', 'List', 'Session', 'Toast', 'Comment'];

