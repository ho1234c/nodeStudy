export default class List {
    constructor($resource, $q) {
        angular.extend(this, {$q});
        this.Rest = $resource('list/:page/:listId', {
            page: '@page',
            listId: '@listId'
        });
    }
    load(){
        const q = this.$q.defer();
        this.Rest.get({
            page: 1,
            listId: 1
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
}

List.$inject = ['$resource', '$q'];