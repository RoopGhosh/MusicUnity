
var videoArray = [];
var forced = false;
var previous = false;
var nextButton=false;
var count=0;
// create youtube player
var player;
var uid;

function initYT(userId) {
    if(!uid){
        uid  = userId;
    }
}
function reloadFunc(videoId,userId) {
   // videoID[1]= 'N21u1bMhHyQ';

    videoArray.push(videoId);
    forced = true;
    onPlayerStateChange('onStateChange');
}

function ytNextSong() {
    nextButton=true;
    onPlayerStateChange('onStateChange');
}

function ytPrevSong() {
    previous = true;
    onPlayerStateChange('onStateChange');
}

function pausePlayer() {
    player.pauseVideo();
}

function cueFromUser(song){
    videoArray.push(song);
}


function pushtoQueue(song) {
    videoArray.push(song);
    count++;
}

function playPlayer() {
    player.playVideo();
}

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
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
    if((event.data === 0 || forced ||nextButton|| previous)&&(previous||count<videoArray.length)){

        if(nextButton || forced || event.data===0){
            if(forced){
                count = videoArray.length-1;
            }else{
                count++;
            }
            player.stopVideo();
            player.loadVideoById(videoArray[count], 0,"large");
            nextButton= false;
            forced=false;
        }

        if(previous){
            if(count<2){
                count=0;
            }else{
                count--;
            }
            player.stopVideo();
            player.loadVideoById(videoArray[count], 0,"large");
            previous= false;
        }
        updateThumbnails(count)
            .done(
                function (response) {
                    console.log("done updating thumbnail")
                    var recent = {
                        title : response.items[0].snippet.title,
                        url :response.items[0].snippet.thumbnails.default.url,
                        videoId :response.items[0].id
                    }
                    isLike(recent.title);
                    angular.injector(['ng', 'MusicUnity']).invoke(function (UserService) {
                        UserService.addSong2Recent(recent,uid);
                    });
                }
            );
        $('#like').attr('fa fa-thumbs-o-up');

        if(count<videoArray.length-1) {
            updateNextThumbnails(count + 1);
        }
        player.playVideo();
    }
}


function isLike(videoId) {
    angular.injector(['ng', 'MusicUnity']).invoke(function (LikeService) {
        LikeService.getLikeBySong(videoId)
            .then(
                function (response) {
                    for(var i in response.data){
                        if(response.data[i]._user==uid){
                            $('#like').attr('class','fa fa-thumbs-up whiteColor');
                            return;
                        }
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
    });
}

function updateThumbnails(count) {
    var currentVideoId = videoArray[count];
    var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=VIDEOID&key=AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA";
    url = url.replace("VIDEOID",currentVideoId);
    var title;
    return $.getJSON(url,{async: false})
        .done(
            function (snippet) {
                if(snippet.items[0].snippet.thumbnails.default.url) {
                    var image = snippet.items[0].snippet.thumbnails.default.url;
                    document.getElementById("prev").innerHTML =
                        '<img id="prev" src=' + image + ' alt="..." class="heightPlayerImage noBorder">';
                }
                if(snippet.items[0].snippet.title){
                    title  = snippet.items[0].snippet.title;
                    document.getElementById("currentTrack").innerHTML = '<h4 id="currentTrack" class="ng-binding">' + title + '</h4>';
                    $.notify("Playing "+title,
                        {   className:'info',
                            style: 'bootstrap',
                            globalPosition: 'top left',
                            autoHideDelay: 5000,
                            autoHide: true,
                            hideAnimation: 'slideUp'});
                }
            }
        );

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
                        '<img id="next" src=' + image + ' alt="..." class="heightPlayerImage noBorder">';
                }
            }
        );
    return;
}
