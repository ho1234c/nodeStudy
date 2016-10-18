export default class Youtube {
    constructor($window){
        this.$window = $window;
        this.template = '<div></div>';
        this.restrict = 'E';
        this.scope = {
            height: "@",
            width: "@",
            videoid: "@"
        };
    }
    link(scope, element){
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        let player;

        this.$window.onYouTubeIframeAPIReady = function() {

            player = new YT.Player(element.children()[0], {
                height: scope.height,
                width: scope.width,
                videoId: scope.videoid,
            });
        };

        scope.$watch('videoid', function(newValue, oldValue) {
            if (newValue == oldValue) {
                return;
            }
            player.loadVideoById(scope.videoid);
        });

        scope.$watch('height + width', function(newValue, oldValue) {
            if (newValue == oldValue) {
                return;
            }
            player.setSize(scope.width, scope.height);
        });

    }
}

Youtube.$inject = ['$window'];