export default class PlayerSvc {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
        this.width = 240;
        this.height = 180;

        this.videoid = null;

        this.listDetail = [];
        this.listDetailPageNum = 7;
        this.listDetailCurrentPage = 1;

        this.playlist = [];
        this.playlistPageNum = 7;
        this.playlistCurrentPage = 1;

        this.currentListName = null;
        this.currentIndex = null;
        this.currentVideoIndex = null;

        this.$rootScope.$on('videoEnd', () => {
            this.pageControl(this.currentIndex, this.currentListName); // increment current index and change into next page.

            let context = this[this.currentListName];
            this.currentVideoIndex += 1;
            this.videoid = context[this.currentVideoIndex].videoId;

            this.highlighting(this.currentIndex, this.currentListName);
        });
    }

    playVideo(index, listname){
        let list = this[listname]; // find context list
        this.currentListName = listname;
        this.currentIndex = index;
        this.currentVideoIndex = this.findVideoIndex(listname);
        this.videoid = list[this.currentVideoIndex].videoId;
    }

    highlighting(index, listname){
        if(listname != this.currentListName && listname != 'musicList'){
            return;
        }

        let highlightObj = {
            index: "",
            listname: listname
        };

        if(listname == 'musicList'){
            highlightObj.index = index;
        }
        else if(listname == 'listDetail' || listname == 'playlist'){
            if (this.checkViewPage()){
                highlightObj.index = index;
            }
            else{
                highlightObj.index = -1;
            }
        }
        this.$rootScope.$broadcast('highlighting', highlightObj);
    }

    pageControl(index, listName){
        if(listName == 'listDetail' && ((index + 1) % this.listDetailPageNum === 0)){
            if(this.checkViewPage()){
                this.listDetailCurrentPage += 1;
            }
            this.currentIndex = 0;
        }
        else if(listName == 'playlist' && ((index + 1)% this.playlistPageNum === 0)){
            if(this.checkViewPage()){
                this.playlistCurrentPage += 1;
            }
            this.currentIndex = 0;
        }
        else{
            this.currentIndex += 1;
        }
    }

    // index of object in ng-repeat and real array is different.
    findVideoIndex(listName){
        let videoIndex;

        if(listName == 'listDetail'){
            videoIndex = this.listDetailPageNum * (this.listDetailCurrentPage - 1) + this.currentIndex;
        }
        else if(listName == 'playlist'){
            videoIndex = this.playlistPageNum * (this.playlistCurrentPage - 1) + this.currentIndex;
        }
        return videoIndex;
    }

    // this method is made for checking that whether user is viewing the page containing current played video.
    checkViewPage(){
        let temp;

        if(this.currentListName == 'listDetail'){
            temp = this.listDetailPageNum * (this.listDetailCurrentPage - 1) + this.currentIndex;
            if(temp == this.currentVideoIndex){
                return true;
            }
        }
        else if(this.currentListName == 'playlist'){
            temp = this.playlistPageNum * (this.playlistCurrentPage - 1) + this.currentIndex;
            if(temp == this.currentVideoIndex){
                return true;
            }
        }
        return false;
    }
}

PlayerSvc.$inject = ['$rootScope'];