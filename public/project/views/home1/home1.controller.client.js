(function () {
    angular
        .module("MusicUnity")
        .controller("Home1Controller", Home1Controller)

    function Home1Controller($routeParams,UserService,LikeService,$http,$location,CommentService) {
        var vm = this;
        vm.userid = $routeParams['uid'];
        vm.FollowerComments=[];
        vm.search = search;
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
