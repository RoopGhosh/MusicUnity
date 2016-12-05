(function () {
    angular
        .module("MusicUnity")
        .controller("Home2Controller",Home2Controller)

    function Home2Controller($routeParams,YouTubeService,UserService,LikeService,PlaylistService) {
        var vm = this;
        vm.userId=$routeParams['uid'];
        vm.search = search;
        vm.getSongName=getSongName;
        vm.selectedSong="Please Select a Song";
        vm.clear=clear;
        vm.setArtWork="http://bobjames.com/wp-content/themes/soundcheck/images/default-album-artwork.png";
        vm.videoId="";
        vm.playPause = playPause;
        vm.changeLikeState=changeLikeState;
        vm.add2Queue = add2Queue;
        vm.queue=""
        vm.getQueue=getQueue;
        var playing = true;
        qObj = ['bBhUcCCqkBo','vXcFGgwP1J4'];
        vm.save2Playlist= save2Playlist;
        vm.shareVideoId=shareVideoId

        function shareVideoId(videoId) {
            vm.shareVideoid = videoId;
        }


        function save2Playlist(private,name) {
            vm.queue=[];
            UserService.getUserQueue(vm.userId)
                .then(function (userQueue) {
                    var queue=userQueue.data.queue;
                    PlaylistService.createPlaylist(queue,vm.userId,private,name)
                        .success(function (response) {
                            console.log(response);
                        })
                        .error(function (error) {
                            console.log("while creating playlsit");
                        })
                })
            $.notify("Playlist created",
                {   className:'info',
                    style: 'bootstrap',
                    globalPosition: 'top center',
                    autoHideDelay: 5000,
                    autoHide: true,
                    hideAnimation: 'slideUp'});
        }

        function getQueue() {
            vm.queue=[];
            UserService.getUserQueue(vm.userId)
                .then(function (userQueue) {
                    var queue=userQueue.data.queue;
                    for(item in queue){
                       YouTubeService.snippetData(queue[item])
                           .success(function (response) {
                               console.log(response);
                               var obj = {
                                   thumbnail : response.items[0].snippet.thumbnails.default,
                                   title : response.items[0].snippet.title,
                               }
                               vm.queue.push(obj);
                           })
                           .error(function (error) {
                               console.log("while retriving snippet data for queue");
                           })
                    }
                })
        }


        function add2Queue(song) {
            var uid = $routeParams['uid'];
            UserService.addSong2UserQueue(uid,song)
                .success(
                    function (response) {
                        vm.queue = response;//response;
                        console.log("added to db")
                    }
                )
                .error(function (error) {
                    //todo
                    //vm.queue = qObj;
                    console.log(error);

                })
            $.notify("Your song added to queue",
                {   className:'info',
                    style: 'bootstrap',
                    globalPosition: 'top center',
                    autoHideDelay: 5000,
                    autoHide: true,
                    hideAnimation: 'slideUp'});
            cueFromUser(song);
        }
        function playPause() {
            console.log("I hit the play button");
            if(playing){
                $('#play').attr('class','fa fa-play whiteColor');
                pausePlayer();
            }else{
                $('#play').attr('class','fa fa-pause whiteColor');
                playPlayer();
            }
            playing = !playing;
        }
        function changeLikeState(state) {
            if(state==='like'){
                //add or update the like collection
                if($('#like').attr('class')==='fa fa-thumbs-up whiteColor'){
                    return
                }
                else{
                    $('#like').attr('class','fa fa-thumbs-up whiteColor');
                    $('#dislike').attr('class','fa fa-thumbs-o-down whiteColor');
                    //add to the db
                    if(vm.selectedSong!= 'Please Select a Song'){
                    LikeService.updateLikebyUserAndSong(vm.userId,vm.selectedSong,true)
                        .success(
                            function (response) {
                                console.log("like updated");
                            }
                        )
                        .error(
                            function (error) {
                                console.error("like update failed");
                            }
                        )
                    }
                }

            }
            else if(state==='dislike'){
                if($('#dislike').attr('class')==='fa fa-thumbs-down whiteColor'){
                    return
                }
                else{
                    $('#like').attr('class','fa fa-thumbs-o-up whiteColor');
                    $('#dislike').attr('class','fa fa-thumbs-down whiteColor');
                    //if present in DB remove it(like schema) else do nothing
                    if(vm.selectedSong!= 'Please Select a Song'){
                        LikeService.updateLikebyUserAndSong(vm.userId,vm.selectedSong,false)
                            .success(
                                function (response) {
                                    console.log("like removed");
                                }
                            )
                            .error(
                                function (error) {
                                    console.error("like update failed");
                                }
                            )
                    }
                }
            }
        }
        function clear() {
            // var element= document.getElementById('searchResults')
            // element.style.visibility="hidden";
            $('#searchResults').hide();
            $('#searchtext').val(null);
        }
        function getSongName (songName,artWork,videoId) {
            vm.selectedSong=songName
            vm.setArtWork=artWork;
            vm.videoId=videoId;
            $('#play').attr('class','fa fa-pause whiteColor');
            reloadFunc(videoId,vm.userId);
        }
        function init() {
            //YouTubeService.initService();

            var searchText = $routeParams.search;
            if(searchText){
                search(searchText);
                vm.searchText = searchText;
            }
            if(YT.loaded){
                onYouTubePlayerAPIReady();
            }
        }
        init();



        function search(searchText) {
            $('#searchResults').css('visibility','visible')
            YouTubeService.searchResult(searchText)
                .success(function (response){
                    $('#searchResults').show();
                    vm.youtubeResults = []
                    for(i in response.items){
                        if(response.items[i].id.kind=="youtube#video"){
                            vm.youtubeResults.push(response.items[i]);
                        }
                    }
                    console.log(vm.youtubeResults.length);
                    /*vm.song = "https://www.youtube.com/watch?v=fuYR5rPADrA";
                    vm.songsObj = {'skin':'skins/tunes/skin.css','volume':50,'autoplay':false,
                        'shuffle':false,'repeat':1,'placement':'bottom','showplaylist':true,
                        'playlist':[{'title':'','url':'{{model.song}}'},
                            {'title':'','url':'https://www.youtube.com/watch?v=uuK2BnzKGNU'}]};*/
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();