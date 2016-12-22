export default class Comment {
    constructor($resource, $q, $rootScope, Session) {
        angular.extend(this, {$q});
        this.commentRequest = $resource('/comment', {}, { post: { method: 'POST'} });
        this.likeRequest = $resource('/comment/like/:id', { id: '@id', classify: '@classify' }, { post: { method: 'POST'} });
        this.commentList = [];
        this.listId = "";
        this.commentNumPerPage = 5;
        this.content = ""; // to keep data when user moves the tab.

        $rootScope.$watchCollection(() => Session, (newVal, oldVal) => {
            if(!Session.user.comment) return;
            let commentKey = Session.user.comment.map(element => element.id);

            for(const index in this.commentList) {
                this.commentList[index].isLike = commentKey.indexOf(this.commentList[index].id) != -1;
            }}
        );
        $rootScope.$watchCollection(() => this.commentList, (newVal, oldVal) => {
            if(!Session.user.comment) return;
            let commentKey = Session.user.comment.map(element => element.id);

            for(const index in newVal) {
                this.commentList[index].isLike = commentKey.indexOf(newVal[index].id) != -1;
            }}
        );
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
    like(id, classify){
        const q = this.$q.defer();
        this.likeRequest.post({
            id: id,
            classify: classify
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
}

Comment.$inject = ['$resource', '$q', '$rootScope', 'Session'];
