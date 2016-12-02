/**
 * Created by roopghosh on 12/2/16.
 */
(function() {
    angular
        .module("MusicUnity")
        .controller("ProfileController", ProfileController)
        .controller("ProfileEditController", ProfileEditController)

    function ProfileController($routeParams,$http,UserService,PlaylistService,CommentService) {
        var userid = $routeParams['uid'];
        var vm = this;
        function init() {
            UserService.findUserById(userid)
                .success(
                    function (response) {
                        vm.user = response;
                    }
                )
                .error(function (error) {
                    console.log(error+"at profile controller inti");
                })

            vm.recentSongsByUser = recentSongsByUser;
            vm.playlistByUser =    playlistByUser;
            vm.commentsByUser =    commentsByUser;
            vm.commentsForUser =    commentsForUser;
            vm.recentSongsByUser=  recentSongsByUser
        }
        init();


        function commentsForUser(userId) {
           CommentService.findCommentForUser(userId)
                .success(function (res) {
                    vm.comments4user= res;
                })
                .error(function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                });
        }

        function recentSongsByUser(userId) {
            UserService.getrecentSongByUser(userId)
                .success(function (res) {
                    vm.recentSongs = res;
                })
                .error(function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                });
        }

        function playlistByUser(userId) {
            PlaylistService.findPlaylistbyUser(userId)
                .success(function (res) {
                    vm.playlist = res;
                })
                .error(function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                });
        }

        function commentsByUser(userId) {
            CommentService.findCommentByUser(userId)
                .success(function (res) {
                    vm.comment2user = res;
                })
                .error(function (error) {

                });
        }
    }


    function ProfileEditController($routeParams,$http,UserService) {
        var userid = $routeParams[uid];
        vm.updateUser = updateUser;
        function init() {
             UserService.findUserById(userid)
                .success(function (user) {
                    vm.user= user;
                })
                .error(function (error) {

                });
        }
        init();

        function updateUser(modifiedUser) {
            UserService.updateUser(userid,modifiedUser)
                .success(function (response) {
                    $http.url("");//todo location.url to profile page.
                })
                .error(function (error) {

                });
        }
    }

})();