
var videoArray = [];
var forced = false;
var count=0;
function reloadFunc(videoId) {
   // videoID[1]= 'N21u1bMhHyQ';
    videoArray.push(videoId);
    forced = true;
    onPlayerStateChange('onStateChange');
}

function pausePlayer() {
    player.pauseVideo();
}

function cueFromUser(song){
    videoArray.push(song);
}

function playPlayer() {
    player.playVideo();
}

// create youtube player
var player;
function onYouTubePlayerAPIReady() {
    console.log(count);
    player = new YT.Player('player', {
        height: '340',
        width: '500',
        videoId: '',
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
    if(event.data === 0 || forced){
        if (event.data === 0 ) {
            event.target.cueVideoById(videoArray[count]);
            var videoid = videoArray[count];
        }
        if(forced){
            player.stopVideo();
            event.target.cueVideoById(videoArray[count]);
            player.nextVideo();
            forced = false;
        }
        updateThumbnails(count);
        if(count<videoArray.length-1) {
            updateNextThumbnails(count + 1);
        }
        event.target.playVideo();
        count++;
    }
}

function updateThumbnails(count) {
    var currentVideoId = videoArray[count];
    var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=VIDEOID&key=AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA";
    url = url.replace("VIDEOID",currentVideoId);
    var title;
    $.getJSON(url,{async: false})
        .done(
            function (snippet) {
                if(snippet.items[0].snippet.thumbnails.default.url) {
                    var image = snippet.items[0].snippet.thumbnails.default.url;
                    document.getElementById("prev").innerHTML =
                        '<img id="prev" src=' + image + ' alt="...">';
                }
                if(snippet.items[0].snippet.title){
                    title  = snippet.items[0].snippet.title;
                    document.getElementById("currentTrack").innerHTML = '<h4 id="currentTrack" class="ng-binding">' + title + '</h4>';
                    $.notify("Playing "+title,
                        {   className:'info',
                            style: 'bootstrap',
                            globalPosition: 'top center',
                            autoHideDelay: 5000,
                            autoHide: true,
                            hideAnimation: 'slideUp'});
                }
            }
        );
    return;
}
function updateNextThumbnails(count) {
    var currentVideoId = videoArray[count];
    var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=VIDEOID&key=AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA";
    url = url.replace("VIDEOID",currentVideoId);
    var title;
    $.getJSON(url,{async: false})
        .done(
            function (snippet) {
                if(snippet.items[0].snippet.thumbnails.default.url) {
                    var image = snippet.items[0].snippet.thumbnails.default.url;
                    document.getElementById("next").innerHTML =
                        '<img id="next" src=' + image + ' alt="...">';
                }
            }
        );
    return;
}
