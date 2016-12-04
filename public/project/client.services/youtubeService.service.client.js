(function (){
    angular
        .module("MusicUnity")
        .factory("YouTubeService",YouTubeService);

    function YouTubeService($http) {
        var api = {
            initService:initService,
            searchResult:searchResult,
            snippetData:snippetData
        }
        return api;

        function initService() {
           /* gapi.client.setApiKey("AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA");
            gapi.client.load("youtube", "v3", function () {
                // yt api is ready
            });*/
        }

        function searchResult(searchText) {
            var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=SEARCHTEXT&maxResults=50&key=AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA";
            url = url.replace("SEARCHTEXT",searchText);
            return $http.get(url);
        }

        function snippetData(videoId) {
            var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=VIDEOID&key=AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA";
            url = url.replace("VIDEOID",videoId);
            return $http.get(url);
        }
    }
})();




