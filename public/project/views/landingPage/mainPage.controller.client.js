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

    function MainPageController($location,UserService,$rootScope) {
        var vm=this;
        vm.signup=signup;
        vm.login=login;
        vm.register=register;

        function init(){
            $("#backButtonParentDiv").css("display","none");
        }
        init();
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
                var user  = {username:returningUser.loginUserName,password:returningUser.loginPassword};
                UserService
                    .login(user)
                    .then(
                        function(response) {
                            var user = response.data;
                            if(user!='0'){
                                $("div").remove(".modal-backdrop");
                                $("#backButtonParentDiv").css("display","block");
                                $rootScope.currentUser = user;
                                $location.url("/user/"+user._id+"/home1");

                            }
                            else{

                                shakeModal();
                            }
                        },
                        function (error) {
                            shakeModal();
                            console.log("something bad happened while loging you in.")
                        }
                    );
            /*UserService.findUserByCredentials(returningUser.loginUserName,returningUser.loginPassword)
                .success(function (user) {
                    if(user!='0'){
                        $("div").remove(".modal-backdrop");
                        $("#backButtonParentDiv").css("display","block");
                        $location.url("/user/"+user._id+"/home1");

                    }
                    else{

                        shakeModal();

                    }
                })
                .error(function (error) {
                    console.log("error in login controller")
                })*/


        }
        function shakeModal(){
            $('#loginModal .modal-dialog').addClass('shake');
           $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
            $('input[type="password"]').val('');
             setTimeout( function(){
                 $('#loginModal .modal-dialog').removeClass('shake');
             }, 10000 );
        }
    }
})();
