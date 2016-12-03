(function () {
    angular
        .module("MusicUnity")
        .controller("HomeController",HomeController)

    function HomeController($routeParams,YouTubeService,UserService) {
        var vm = this;
        vm.search = search;
        vm.getSongName=getSongName;
        vm.selectedSong="Please Select a Song";
        vm.clear=clear;
        vm.setArtWork="";
        vm.likedState='none'
        vm.videoId="";
        vm.playPause = playPause;
        vm.changeLikeState=changeLikeState;
        vm.add2Queue = add2Queue;
        var playing = true;
        qObj = ['bBhUcCCqkBo','vXcFGgwP1J4'];

        function add2Queue(song) {
            cueFromUser(song);
            var uid = $routeParams['uid'];
            UserService.addSong2UserQueue(uid,song)
                .success(
                    function (response) {
                        vm.queue = qObj;//response;
                    }
                )
                .error(function (error) {
                    //todo
                    vm.queue = qObj;
                    console.log(error);

                })
        }
        function playPause() {
            console.log("I hit the play button");
            if(playing){
                $('#play').attr('class','fa fa-play');
                pausePlayer();
            }else{
                $('#play').attr('class','fa fa-pause');
                playPlayer();
            }
            playing = !playing;
        }
        function changeLikeState(state) {
            if(state==='like'){
                //add or update the like collection
                if($('#like').attr('class')==='fa fa-thumbs-up'){
                    return
                }
                else{
                    $('#like').attr('class','fa fa-thumbs-up');
                    $('#dislike').attr('class','fa fa-thumbs-o-down');
                    //add to the db

                }

            }
            else if(state==='dislike'){
                if($('#dislike').attr('class')==='fa fa-thumbs-down'){
                    return
                }
                else{
                    $('#like').attr('class','fa fa-thumbs-o-up');
                    $('#dislike').attr('class','fa fa-thumbs-down');
                    //if present in DB remove it(like schema) else do nothing
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
            $('#play').attr('class','fa fa-pause');
            reloadFunc(videoId);
        }
        function init() {
            //YouTubeService.initService();
        }
        init();



        function search(searchText) {
            YouTubeService.searchResult(searchText)
                .success(function (response){
                    $('#searchResults').show();
                    vm.youtubeResults = response.items;
                    vm.song = "https://www.youtube.com/watch?v=fuYR5rPADrA";
                    vm.songsObj = {'skin':'skins/tunes/skin.css','volume':50,'autoplay':false,
                        'shuffle':false,'repeat':1,'placement':'bottom','showplaylist':true,
                        'playlist':[{'title':'','url':'{{model.song}}'},
                            {'title':'','url':'https://www.youtube.com/watch?v=uuK2BnzKGNU'}]};
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();