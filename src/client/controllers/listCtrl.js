export default class listCtrl {
    constructor(List, initList) {
        angular.extend(this, {List, initList});
        this.List = List;
        this.musicList = initList.data;
        this.detail = [];
        this.isSelectedList = null;
        this.isSelectedSong = null;

        this.pageSize = 7;
        this.currentPage = 1;

        this.yt = {
            width: "",
            height: "",
            videoId: ""
        };
    }
    watchMore(count){
        this.List.loadList(count)
            .then(result => {
                for(const obj of result.data){
                    this.musicList.push(obj);
                }
            });
    }
    viewDetail(id){
        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                for(const obj of songInfo){
                    this.detail.push(obj);
                }
            });

        this.detail = [];
        this.isSelectedSong = null;

    }
    selectedHighting(index, target){
        if(target == 'list'){
            this.isSelectedList = index;
        }
        else if(target == 'song'){
            this.isSelectedSong = index;
        }
    }
}

listCtrl.$inject = ['List', 'initList'];

