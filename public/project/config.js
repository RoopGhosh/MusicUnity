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
                templateUrl: "/project/views/mainPage.view.client.html",
                controller:"MainPageController",
                controllerAs :"model"
            })
            .when("/youtube", {
                templateUrl: "/project/views/home2/home2.view.client.html",
                controller:"HomeController",
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
            .otherwise({
                redirectTo: "/home"
            })

    }
})();
