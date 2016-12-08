(function () {
    angular
        .module("MusicUnity")
        .controller("Home1Controller", Home1Controller)

    function Home1Controller($routeParams,UserService,LikeService,$http,$location,CommentService) {
        var vm = this;
        vm.userid = $routeParams['uid'];
        //vm.users=[{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},];
        vm.FollowerStatus=[];//{username,comment,imageSrc}
        vm.search = search;
        vm.followUser=followUser;
        vm.unfollowUser=unfollowUser;
        vm.feeds="";
        //vm.status=[{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""},{stauts:"am awesme",url:""}]
        vm.allUser=[];//[user]
        //all user {user,following:true}
        //vm.FollowingUser = [] remove this
        vm.FollowerrecentSong = []; //[{song,username]{song:title,url}
        vm.user; // this is the current user object

        //merge mystatus and followers status

        vm.createMyComment = createMyComment;

        function createMyComment (text) {
            CommentService.createComment(vm.userid,text)
                .success(
                    function (response) {
                        $.notify("Your status was saved",
                            {   className:'info',
                                style: 'bootstrap',
                                globalPosition: 'top left',
                                autoHideDelay: 5000,
                                autoHide: true,
                                hideAnimation: 'slideUp'});
                    }
                )
                .error(
                    function (error) {
                        console.log("something bad happened when saving your comment");
                    }
                )
        }

        function followUser(followUser,index) {  //userId i need
            var follow='#follow'+ index;
            $(follow).attr('class','hide,followIconHeight');
            var unfollow='#unfollow'+index
            $(unfollow).attr('class','show,followIconHeight')
            user.following.push(followUser._id);
            UserService.updateUser(user._id,user)
                .success(function (response) {
                    console.log("updated Successfully");
                })
                .error(
                    function (error) {
                        console.log("something failed while adding followers");
                    }
                )
        }

        function unfollowUser (followUser,index) {
            var follow='#follow'+ index;
            $(follow).attr('class','show,followIconHeight');
            var unfollow='#unfollow'+index;
            $(unfollow).attr('class','hide,followIconHeight');
            for(var i in user.following){
                if(user.following[i]==user._id){
                    user.following.splice(item,1);
                    break;
                }
            }
            UserService.updateUser(user._id,followUser);
        }
        function init() {
            getFollowerCommentsAndRecentSongList();
            getUserList();

        }
        init();

        function getUserList() {
            UserService.allUser()
                .success(
                    function (response) {
                        //vm.allUser = response; //response = [{_id,name}]
                        vm.allUser = createUserFollowList(response,vm.user.following);
                    }
                )
        }

        function createUserFollowList(allUsers,followingUser) {
            var usersWithFollowing = [];
            var item;
            for(i in allUsers)
            {
                var found = followingUser.indexOf(allUsers[i]._id);
                if(found!=-1){
                    item = {
                        user:allUsers[i],
                        following:true
                    }
                }else{
                    item = {
                        user:allUsers[i],
                        following:false
                    }
                }
                usersWithFollowing.push(item)
            }

            return usersWithFollowing;
        }

       function getFollowerCommentsAndRecentSongList(){
            UserService.findUserById(vm.userid)
                .success(function (user) {
                    vm.user = user;
                    vm.FollowingUser = user.following;
                    vm.FollowingUser.push(user._id); //for retriving a users own comments;
                    for(item in user.following){
                        CommentService.findCommentByUser(user.following[item])
                            .success(
                                function (comments) {
                                    var statusArray = createStatusArray(comments.splice(0,10),user.username,user.url); //top 10 comments from followers
                                    vm.FollowerStatus = vm.FollowerStatus.concat(statusArray);
                                     vm.FollowerStatus= shuffle(vm.FollowerStatus);
                                    //this is bad shuffle placement..
                                }
                            )
                            .error(
                                function (error) {
                                    console.error("error while adding comments to array");
                                }
                            )
                    }
                    for(i in user.following){
                        UserService.findUserById(user.following[i])
                            .success(
                                    function (followingUser) {
                                        var recentSongArray = createRecentSongArray(followingUser.recent.splice(0,10),followingUser.username);
                                        vm.FollowerrecentSong= vm.FollowerrecentSong.concat(recentSongArray); //splicing to show last 10 only
                                        vm.FollowerrecentSong  = shuffle(vm.FollowerrecentSong );
                                        //this is bad shuffle placement..
                                    }
                                )
                                    .error(
                                        function (error) {
                                            console.error("error while adding recentsong to array");
                                        }
                                    )
                    }
                })
                .error(
                    function (error) {
                        console.error("error while retriving user from userservice");
                    }
                )
        }


        function createStatusArray(statusArray, username,url){
            var statusArr = []
            for(i in statusArray){
                var item = {
                    username:username,
                    url:url,
                    status:statusArray[i].comment
                }
                statusArr.push(item);
            }
            return statusArr;
        }

        function createRecentSongArray(songArray, username){
           var songArr = [];
            for(i in songArray){
                var item = {
                    username:username,
                    song:songArray[i]
                };
                songArr.push(item);
            }
            return songArr;
        }

        function search(text) {
            $location.url("/user/"+vm.userid+"/home2?search="+text);
        }

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }





    }
})();
