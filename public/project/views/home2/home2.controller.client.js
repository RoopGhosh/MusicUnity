(function () {
    angular
        .module("MusicUnity")
        .controller("HomeController",HomeController)

    function HomeController(YouTubeService) {
        var vm = this;
        vm.search = search;
        function init() {
            //YouTubeService.initService();
        }
        init();

        function search(searchText) {
            YouTubeService.searchResult(searchText)
                .success(function (response){
                    vm.youtubeResults = response.items;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();