
    var videoID = ["u1zgFlCw8Aw","jdqsiFw74Jk"];
var forced = false;
function reloadFunc(videoId) {
   // videoID[1]= 'N21u1bMhHyQ';
    videoID[1]=videoId;
    forced = true;
    onPlayerStateChange('onStateChange');
}

// create youtube player
var player;
var count=0;
function onYouTubePlayerAPIReady() {
    console.log(count);
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'u1zgFlCw8Aw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }

    });
}

// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {
    if (event.data === 0 ) {
        event.target.cueVideoById(videoID[1]);
        event.target.playVideo();
    }
    if(forced){
        player.stopVideo();
        event.target.cueVideoById(videoID[1]);
        player.nextVideo();
        event.target.playVideo();
        forced = false;
    }
}
