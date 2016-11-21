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
                    vm.song = "https://www.youtube.com/watch?v=fuYR5rPADrA";
                    vm.songsObj = {'skin':'skins/tunes/skin.css','volume':50,'autoplay':false,
                        'shuffle':false,'repeat':1,'placement':'bottom','showplaylist':true,
                        'playlist':[{'title':'','url':'{{model.song}}'},
                            {'title':'','url':'https://www.youtube.com/watch?v=uuK2BnzKGNU'}]};
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();