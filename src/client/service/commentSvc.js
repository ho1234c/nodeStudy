export default class Comment {
    constructor($resource, $q) {
        angular.extend(this, {$q});
        this.commentRequest = $resource('/comment', {},
            { post:
                { method: 'POST'}
            });

        this.commentList = [];
        this.listId = "";
        this.commentNumPerPage = 5;
        this.content = ""; // to maintain data
    }
    create(data){
        const q = this.$q.defer();

        this.commentRequest.post({
            data: data
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
}

Comment.$inject = ['$resource', '$q'];
