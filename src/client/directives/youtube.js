export default function youtube($window) {
    return {
        restrict: "E",

        scope: {
            height:   "@",
            width:    "@",
            videoId:  "@"
        },

        template: '<div></div>',

        link: (scope, element) => {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            let player;

            $window.onYouTubeIframeAPIReady = () => {
                player = new YT.Player(element.children()[0], {

                    playerVars: {
                        autoplay: 0,
                        html5: 1,
                        theme: "dark",
                    },

                    height: scope.height,
                    width: scope.width,
                    videoId: scope.videoId
                });
            };

            scope.$watch('videoid', (newValue, oldValue) => {
                if (newValue == oldValue) {
                    return;
                }

                player.cueVideoById(scope.videoid);

            });

            scope.$watch('height + width', function(newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }

                player.setSize(scope.width, scope.height);
            })
        }
    }
}