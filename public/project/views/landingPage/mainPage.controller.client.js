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
        vm.register=register;

        function register(newUser) {
            var usernameAlreadyPresent=UserService.findUserByUsername(newUser.username);
            usernameAlreadyPresent
                .success(function (user) {
                    if(user!='0'){
                        vm.errorRegister="Username already taken";
                        console.log("User taken");
                    }else{
                        UserService.createUser(newUser)
                            .success(function (addedUser) {
                                $location.url("/user/"+addedUser+"/profile");
                                console.log("user created");
                            })
                            .error(function (error) {
                                console.log(error + "error creating user");
                            })
                    }
                })

        }
        function signup () {
            $location.url("/signup");
        }

        function login (returningUser) {
            console.log()

            UserService.findUserByCredentials(returningUser.loginUserName,returningUser.loginPassword)
                .success(function (user) {
                    if(user!='0'){
                        $location.url("/user/"+user._id+"/profile");

                    }
                    else{
                        console.log("User not found");
                        vm.errorLogin="User Not found";
                    }
                })
                .error(function (error) {
                    console.log("error in login controller")
                })


        }
    }
})();
