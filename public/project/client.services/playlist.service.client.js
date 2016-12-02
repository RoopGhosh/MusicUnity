/**
 * Created by roopghosh on 12/2/16.
 */
(function () {
    angular
        .module("MusicUnity")
        .factory("PlaylistService", PlaylistService);

    function PlaylistService($http) {
        var api = {
            findPlaylistbyId:findPlaylistbyId,
            findPlaylistbyUser:findPlaylistbyUser,
            udpatePlaylist:udpatePlaylist,
            deletePlaylist:deletePlaylist,
            createPlaylist:createPlaylist,
            addSongtoPlaylist:addSongtoPlaylist
        }
        return api;
    }
})();


