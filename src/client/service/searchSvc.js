export default class Search {
    constructor($resource, $q) {
        angular.extend(this, {$q});

        this.youtubeApi = $resource('search/:word', {
            word: '@word'
        });
        this.searchWord = null;
        this.searchArray = [];
        this.nextPageToken = null;
        this.selectedIndex = null;
    }
    searchVideo(word, pageToken){
        const q = this.$q.defer();
        this.youtubeApi.get({
            word: word,
            pageToken: pageToken
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
}
Search.$inject = ['$resource', '$q'];
