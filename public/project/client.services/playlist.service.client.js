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

        function findPlaylistbyId(userId) {
            $http.get("/api/user/"+userId+"/pls");
        }

        function findPlaylistbyUser(uid){
            return $http.get("/api/user/"+uid+"/pls");
        }

        function udpatePlaylist(uid,pid,pls){
            return $http.put("/api/user/"+uid+"/pls/"+pid,pls);
        }

        function deletePlaylist(){
            return $http.delete("/api/user/"+uid+"/pls/"+pid);
        }

        function createPlaylist(queue,uid,private,name){
            var pls = {
                songs:queue,
                private:private,
                name : name
            };
            return $http.post("/api/user/"+uid+"/pls/new",pls);
        }

        function addSongtoPlaylist(uid,pid,song){
            return $http.post("/api/user/"+uid+"/pls/"+pid+"/addSong",song);
        }
    }
})();


