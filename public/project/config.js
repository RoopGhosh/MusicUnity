/**
 * Created by Amardeep on 08/10/16.
 */
//iffy statement to protect the namespace
(function() {
    console.log("in config");
    angular
        .module("MusicUnity")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/project/views/landingPage/mainPage.view.client.html",
                controller:"MainPageController",
                controllerAs :"model"
            })
            .when("/signup", {
                templateUrl: "/project/views/signup.view.client.html"
                //    controller:"LoginController",
                //  controllerAs :"model"
            })
            .when("/test", {
                templateUrl: "/project/views/playback.html"
                //    controller:"LoginController",
                //  controllerAs :"model"
            })
            .when("/user/:uid/profile", {
            templateUrl: "/project/views/profile/profile.view.client.html",
            controller:"ProfileController",
            controllerAs :"model"
            })
            .when("/user/:uid/home2", {
                templateUrl: "/project/views/home2/home2.html",
                    controller:"Home2Controller",
                  controllerAs :"model"
            })
            .when("/user/:uid/home1", {
                templateUrl: "/project/views/home1/home1.view.client.html",
                controller:"Home1Controller",
                controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/home"
            })

    }
})();
