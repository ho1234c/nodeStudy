export default class searchAddCtrl {
    constructor(Search, Player, List, Session, Toast) {
        angular.extend(this, {Search, Player, List, Session, Toast});
        this.date = new Date();
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
    createList(list){
        if(this.List.validation(list) == 'valid'){
            this.List.listForm.songInfo = this.List.createdList;
            this.List.listForm.makerId = this.Session.user.id;
            this.List.create(this.List.listForm)
                .then(res => {
                    console.log(res.status);
                    this.List.initForm();
                    this.Toast.success('등록되었습니다');
                });
        }
        else{
            this.Toast.fail(result);
        }
    }
}

searchAddCtrl.$inject = ['Search', 'Player', 'List', 'Session', 'Toast'];