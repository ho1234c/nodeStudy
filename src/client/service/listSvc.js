export default class List {
    constructor($resource, $q) {
        angular.extend(this, {$q});
        this.listRequest = $resource('load/list');
        this.songRequest = $resource('load/song/:id', {
            id: '@id'
        });

        this.musicList = [];
        this.selectedIndex = null;

        this.createdList = [];
        this.pageNum = 7;
        this.currentPage = 1;
    }
    loadList(count){
        const q = this.$q.defer();
        this.listRequest.get({
            count: count
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
    loadSong(id){
        const q = this.$q.defer();
        this.songRequest.get({
            id: id
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
    create(data){
        const q = this.$q.defer();
        this.listRequest.save({
            data: data
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
}

List.$inject = ['$resource', '$q'];