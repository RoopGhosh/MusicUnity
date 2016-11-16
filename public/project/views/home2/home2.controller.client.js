(function () {
    angular
        .module("MusicUnity")
        .controller("HomeController",HomeController)

    function HomeController() {
        var vm = this;
        vm.search = search2;
        function intiliazeAPI() {
            gapi.client.setApiKey("AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA");
            gapi.client.load("youtube", "v3", function () {
                // yt api is ready
            });
        }

        function search2(searchText) {
            var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=SEARCHTEXT&maxResults=50&key=AIzaSyAqvaj33Z1ZRdiWP6vJ9IQ3EswflLRqqbA";
            url.replace("SEARCHTEXT",searchText);
            $http.get(url)
                .success(function (response){
                    console.log(response.items);
                })
                .error(function (error) {
                    console.log(error);
                });
        }


        function search(searchText) {
                intiliazeAPI();
                var request = gapi.client.youtube.search.list({
                    part: "snippet",
                    type: "video",
                    q: encodeURIComponent(searchText).replace(/%20/g, "+"),
                    maxResults: 3,
                    order: "viewCount",
                    publishedAfter: "2015-01-01T00:00:00Z"
                });
                request.execute(function (response) {
                    var results = response.result;
                    console.log(results);
                });
            }
        }
})();