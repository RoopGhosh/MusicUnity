(function () {
    angular
        .module("MusicUnity")
        .controller("Home1Controller", Home1Controller)

    function Home1Controller($routeParams,UserService,LikeService,$http,$location,CommentService) {
        var vm = this;
        vm.userid = $routeParams['uid'];
        vm.users=[{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},{username:"amardeep0070"},];
        vm.FollowerComments=[];
        vm.search = search;
        vm.followUser=followUser;
        vm.unfollowUser=unfollowUser;
        function followUser(user,index) {
            var follow='#follow'+ index;
            $(follow).attr('class','hide');
            var unfollow='#unfollow'+index
            $(unfollow).attr('class','show')
        }

        function unfollowUser (user,index) {
            var follow='#follow'+ index;
            $(follow).attr('class','show');
            var unfollow='#unfollow'+index
            $(unfollow).attr('class','hide')
        }
        function init() {
            UserService.findUserById(vm.userid)
                .success(function (user) {
                    for(item in user.following){
                        CommentService.findCommentByUser(user.following[item])
                            .success(
                                function (comment) {
                                    vm.FollowerComments.push({name:user.firstName,comment:comment});
                                }
                            )
                            .error(
                                function (error) {
                                    console.error("error while adding comments to array");
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
        init();
        function search(text) {
            $location.url("/user/"+vm.userid+"/home2?search="+text);
        }
    }
})();
