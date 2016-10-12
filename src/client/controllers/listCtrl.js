export default class listCtrl {
    constructor(List, initList, $resource) {
        angular.extend(this, {List, initList, $resource});
        this.list = initList.data;
    }

    viewDetail(){

    }
}

listCtrl.$inject = ['List', 'initList', '$resource'];

