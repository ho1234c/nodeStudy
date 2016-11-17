export default class searchAddCtrl {
    constructor(Search, Player, List, Session, Toast) {
        angular.extend(this, {Search, Player, List, Session, Toast});
        this.date = new Date();
    }
    search(){
        this.Search.searchArray = [];
        if(!this.Search.searchWord){
            this.Toast.fail('검색어를 입력해주세요');
            return;
        }
        this.Search.searchVideo(this.Search.searchWord)
            .then(result => {
                for(const index in result.data){
                    this.Search.searchArray.push(result.data[index]);
                }
                this.Search.nextPageToken = result.nextPageToken;
            });
    }
    searchMore(){
        this.Search.searchVideo(this.Search.searchWord, this.Search.nextPageToken)
            .then(result => {
                for(const index in result.data){
                    this.Search.searchArray.push(result.data[index]);
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
    removeSong(index){
        this.List.createdList.splice(index, 1);
    }
    createList(list){
        let msg = this.List.validation(list);
        if(msg == 'valid'){
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
            this.Toast.fail(msg);
        }
    }
}

searchAddCtrl.$inject = ['Search', 'Player', 'List', 'Session', 'Toast'];