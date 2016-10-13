export default class listCtrl {
    constructor(List, initList, $resource) {
        angular.extend(this, {List, initList, $resource});
        this.list = initList.data.map((obj) => {obj.songInfo = JSON.parse(obj.songInfo); return obj;});
        this.detail = [];
    }

    viewDetail(data){
        let items = data.songInfo.items;
        for(let i in items){
            this.detail.push(items[i]);
            console.log(items[i]);

        }
    }
}

listCtrl.$inject = ['List', 'initList', '$resource'];

