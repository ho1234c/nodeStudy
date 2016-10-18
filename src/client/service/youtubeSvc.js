export default class Youtube {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
        this.width = 240;
        this.height = 180;
        this.videoid = "fj8sk-b6NG4";
        this.playlist = [];
    }

    playVideo(id){
        this.videoid = id;
    }

    highlighting(index, name){
        this.$rootScope.$broadcast('videoChanged', { index: index, name: name });
    }
}

Youtube.$inject = ['$rootScope'];