export default class PlayerSvc {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
        this.width = 240;
        this.height = 180;

        this.videoid = null;

        // in main-music-list
        this.listDetail = [];
        this.listDetailPageNum = 7;
        this.listDetailCurrentPage = 1;

        // in id-box
        this.playlist = [];
        this.playlistPageNum = 7;
        this.playlistCurrentPage = 1;

        // current status
        this.status = {
            listName: null,     // playing array name
            listIndex: null,    // playing array index
            videoIndex: null,   // playing video index
            playingListId: null,// playing musicList id
            musicListId: null,  // selected musicList id
            userListId: null,   // selected user.list id
        };

        this.$rootScope.$on('videoEnd', () => {
            this._pageControl(this.status.listIndex, this.status.listName); // increment video index and change current page into next page.

            let context = this[this.status.listName];
            this.videoid = context[this.status.videoIndex].videoId;

        });
    }

    playVideo(index, listname){
        this.status.playingListId = listname  == 'listDetail' ? this.status.musicListId : this.status.userListId;

        // update status
        this.status.listName = listname;
        this.status.listIndex = index;
        this.status.videoIndex = this._findVideoIndex(listname);

        let list = this[listname]; // find context list
        this.videoid = list[this.status.videoIndex].videoId;
    }

    highlighting(index, listname){
        if((listname == 'listDetail' && this.status.playingListId != this.status.musicListId) ||  // 현재 플레이되고 있는 비디오가 포함된 리스트와
            (listname == 'playlist' && this.status.playingListId != this.status.userListId) ||    // 유저가 조회하고있는 리스트가 다를 경우 하이라이팅하지 않는다.
            (listname != this.status.listName)) // 클릭한 리스트만 하이라이팅한다.
        {
            return;
        }

        let highlightObj = {
            index: this._checkViewPage() ? index : -1, // 유저가 조회하고 있는 페이지가 재생중인 비디오가 포함된 페이지가 아니라면 하이라이팅 하지 않는다.
            listname: listname,
            listId: this.status.playingListId
        };

        this.$rootScope.$broadcast('highlighting', highlightObj);
    }

    // determine whether page increase or not.
    _pageControl(index, listName){
        if(listName == 'listDetail' && ((index + 1) % this.listDetailPageNum === 0)){
            if(this._checkViewPage()){
                this.listDetailCurrentPage += 1;
                this.status.videoIndex += 1;
            }
            this.status.listIndex = 0;
        }
        else if(listName == 'playlist' && ((index + 1)% this.playlistPageNum === 0)){
            if(this._checkViewPage()){
                this.playlistCurrentPage += 1;
                this.status.videoIndex += 1;
            }
            this.status.listIndex = 0;
        }
        else{
            this.status.listIndex += 1;
            this.status.videoIndex += 1;
            this.highlighting(this.status.listIndex, this.status.listName);
        }
    }

    // index of object in ng-repeat and real array is different.
    _findVideoIndex(listName){
        let videoIndex;

        if(listName == 'listDetail'){
            videoIndex = this.listDetailPageNum * (this.listDetailCurrentPage - 1) + this.status.listIndex;
        }
        else if(listName == 'playlist'){
            videoIndex = this.playlistPageNum * (this.playlistCurrentPage - 1) + this.status.listIndex;
        }
        return videoIndex;
    }

    // this method is made for checking that whether user is viewing the page containing current played video.
    _checkViewPage(){
        let temp;
        if(this.status.listName == 'listDetail'){
            temp = this.listDetailPageNum * (this.listDetailCurrentPage - 1) + this.status.listIndex;
            if(temp == this.status.videoIndex){
                return true;
            }
        }
        else if(this.status.listName == 'playlist'){
            temp = this.playlistPageNum * (this.playlistCurrentPage - 1) + this.status.listIndex;
            if(temp == this.status.videoIndex){
                return true;
            }
        }
        return false;
    }
}

PlayerSvc.$inject = ['$rootScope'];