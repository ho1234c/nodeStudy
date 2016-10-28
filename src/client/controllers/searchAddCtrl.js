export default class searchAddCtrl {
    constructor(Search, Player, List) {
        angular.extend(this, {Search, Player, List});
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
    createList(data){
        this.List.create(data)
            .then(res => {
                console.log(res);
            });
    }
    insertSong(obj){
        this.List.createdList.push(obj);
    }

}

searchAddCtrl.$inject = ['Search', 'Player', 'List'];