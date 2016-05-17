(function () {
    angular.module("app").directive("rtcVideo",Factory);

    Factory.$inject = [];

    function Factory(){
        return {
            scope: {
            },
            replace:true,
            link:function(scope, element){
                let block = angular.element(element);
                let maxWidth = block.parent().width();
                block.on('DOMSubtreeModified',function(e){
                    let videos = block.find('video');
                    let lenght = videos.length;
                    let videoWidth = maxWidth;
                    if (lenght>1 && lenght<=4){
                        videoWidth = maxWidth/2;
                    } else if (lenght>4){
                        videoWidth = maxWidth/3
                    }
                    videos.each(function(){
                        angular.element(this).width(videoWidth);
                    });
                });
            }
        }
    }
})();