/**
 * Created by Amardeep on 15/11/16.
 */
/**
 * Created by Amardeep on 15/11/16.
 */
(function () {
    angular
        .module("MusicUnity")
        .controller("MainPageController",MainPageController );

    function MainPageController($location) {
        var vm=this;
        vm.signup=signup;
        function signup () {
            $location.url("/signup");
        }

    }
})();
