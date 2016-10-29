export default class searchAddCtrl {
    constructor(Search, Player, List, Session) {
        angular.extend(this, {Search, Player, List, Session});
    }
    search(){
        this.Search.searchArray = [];
        this.Search.searchVideo(this.Search.searchWord)
            .then(result => {
                for(const obj of result.data){
                    this.Search.searchArray.push(obj);
                }
                this.Search.nextPageToken = result.nextPageToken;
            });
    }
    searchMore(){
        this.Search.searchVideo(this.Search.searchWord, this.Search.nextPageToken)
            .then(result => {
                for(const obj of result.data){
                    this.Search.searchArray.push(obj);
                }
                this.Search.nextPageToken = result.nextPageToken;
            });
    }
    playVideo(id){
        this.Player.videoid = id;
    }
    insertSong(obj){
        this.List.createdList.push(obj);
    }
    createList(){
        this.List.listForm.songInfo = this.List.createdList;
        this.List.listForm.makerId = this.Session.user.id;
        this.List.create(this.List.listForm)
            .then(res => {
                console.log(res);
            });
    }

}

searchAddCtrl.$inject = ['Search', 'Player', 'List', 'Session'];