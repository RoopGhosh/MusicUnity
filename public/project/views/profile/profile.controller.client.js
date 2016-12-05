/**
 * Created by roopghosh on 12/2/16.
 */
(function() {
    angular
        .module("MusicUnity")
        .controller("ProfileController", ProfileController)
        .controller("ProfileEditController", ProfileEditController)

    function ProfileController($routeParams,$http,UserService,PlaylistService,CommentService,LikeService) {
        $('body').attr('class',"");
        $('.modal-backdrop').attr('class',"");
        var userid = $routeParams['uid'];
        var vm = this;
        vm._id=userid;
        vm.updateUser=updateUser;
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

             recentSongsByUser(userid);
            playlistByUser(userid);
           commentsByUser(userid);
            //commentsForUser(userid);
            getUserFollowing(userid);
             likeByUser(userid);
        }
        init();

        function getUserFollowing(userId) {
            array=[];
            UserService.findUserById(userId)
                .success(function (response) {
                    var userFollowing=response.following ;
                    for(item in userFollowing){
                        UserService.findUserById(userFollowing[item])
                            .success(function (response) {
                                array.push(response);
                            })
                            .error(
                                function (error) {
                                    console.log("while looping over users"+error);
                                }
                            )
                    }
                    vm.following = array;
                })
                .error(
                    function (error) {
                        console.log("error at get user following"+error);
                    }
                )
        }

        function likeByUser(userid) {
            LikeService.getLikeByUser(userid)
                .success(function (response) {
                    vm.likes= response;
                })
                .error(function (error) {
                    console.log(error);
                })
        }

        function updateUser(modifiedUser) {
            UserService.updateUser(userid,modifiedUser)
                .success(function (response) {
                    $('.error').addClass('alert alert-success').html("Profile Updated")
                   // $location.url("/user"+ userid+ "/profile");
                })
                .error(function (error) {
                    console.log(error + "error updatiing widget in profile controller")
                });
        }

        //not using
        function commentsForUser(userId) {
           CommentService.findCommentForUser(userId)
                .success(function (res) {
                    vm.comments4user= res;
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        function recentSongsByUser(userId) {
            UserService.getrecentSongByUser(userId)
                .success(function (res) {
                    vm.recentSongs = res;
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        function playlistByUser(userId) {
            PlaylistService.findPlaylistbyUser(userId)
                .success(function (res) {
                    vm.playlist = res;
                })
                .error(function (error) {
                    console.log(error);
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
                    $http.url("/user"+ response._id+ "/profile");//todo location.url to profile page.
                })
                .error(function (error) {

                });
        }
    }

})();