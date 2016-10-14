export default class listCtrl {
    constructor(List, initList, $resource) {
        angular.extend(this, {List, initList, $resource});
        this.List = List;
        this.musicList = initList.data;
        this.detail = [];
    }
    watchMore(count){
        this.List.loadList(count)
            .then(result => {
                for(let obj of result.data){
                    this.musicList.push(obj);
                }
            });
    }
    viewDetail(id){
        this.List.loadSong(id)
            .then(result => {
                const songInfo = JSON.parse(result.data.songInfo);
                console.log(songInfo);
                for(let obj in songInfo){
                    this.detail.push(obj);
                }
            })

    }
}

listCtrl.$inject = ['List', 'initList', '$resource'];

