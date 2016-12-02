/**
 * Created by roopghosh on 12/2/16.
 */
(function () {
    angular
        .module("MusicUnity")
        .factory("LikeService", LikeService);

    function LikeService($http) {
        var api = {
            findLikeByUserAndSong:findLikeByUserAndSong,
            updateLikebyUserAndSong:updateLikebyUserAndSong,
            getLikeByUser:getLikeByUser,
            getLikeBySong:getLikeBySong
        }
        return api;
    }
})();

