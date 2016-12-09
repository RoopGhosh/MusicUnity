(function (){
    angular
        .module("MusicUnity")
        .factory("DailyMotionService",DailyMotionService);

    function DailyMotionService($http,$q) {
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

        //not using
        function searchResult(searchText) {
            var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=SEARCHTEXT&maxResults=50&key=AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA";
            url = url.replace("SEARCHTEXT",searchText);
            return $http.get(url);
        }

        function snippetData(videoId) {
            var url = "https://api.dailymotion.com/video/VIDEOID?fields=id,title,thumbnail_url";
            url = url.replace("VIDEOID",videoId);
            return $http.get(url);
        }
    }
})();




