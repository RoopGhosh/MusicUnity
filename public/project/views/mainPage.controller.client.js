/**
 * Created by Amardeep on 15/11/16.
 */
/**
 * Created by Amardeep on 15/11/16.
 */
(function () {
    angular
        .module("MusicUnity")
        .controller("MainPageController",MainPageController )

    function MainPageController($location,UserService) {
        var vm=this;
        vm.signup=signup;
        vm.login=login;
        function signup () {
            $location.url("/signup");
        }

        function login (user) {
            UserService.findUserByCredentials(user.username,user.password)
                .success(function (user) {
                    if(user!='0'){
                        $location.url("/profile");
                    }
                    else{
                        vm.error="User Not found";
                    }
                })
                .error(function (error) {
                    console.log("error in login controller")
                })


        }
    }
})();
