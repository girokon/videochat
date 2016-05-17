(function () {
    angular.module("app").component("appIndex",{
        templateUrl:"js/components/app/index.html",
        controller: Controller
    });

    Controller.$inject = [];

    function Controller(){
        this.rtcOptions = {
            room:"test-room",
            signaller:"https://"+ location.host,
            ice: [
                { url: 'stun:stun1.l.google.com:19302' },
                { url: 'stun:stun2.l.google.com:19302' },
                { url: 'stun:stun3.l.google.com:19302' },
                { url: 'stun:stun4.l.google.com:19302' }
            ]
        };

        this.rtc = RTC(this.rtcOptions);

        // A div element to show our local video stream
        var localVideo = document.getElementById('l-video');
// A div element to show our remote video streams
        var remoteVideo = document.getElementById('r-video');

        // Display local and remote video streams
        //localVideo.appendChild(this.rtc.local);
        //remoteVideo.appendChild(this.rtc.remote);

        this.rtc.on("init",function(session){
            console.log('RTC init');
        });
    }
})();