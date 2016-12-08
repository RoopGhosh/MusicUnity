/**
 * Created by Amardeep on 11/10/16.
 */
(function () {
    angular
        .module("MusicUnity")
        .factory("UserService",UserService);



    function UserService($http) {
        var api= {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            deleteUser: deleteUser,
            updateUser: updateUser,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            getUserQueue: getUserQueue,
            getrecentSongByUser: getrecentSongByUser,
            addSong2UserQueue: addSong2UserQueue,
            addSong2Recent:addSong2Recent,
            deleteSongFromQueue:deleteSongFromQueue,
            updateUserQueue:updateUserQueue,
            allUser:allUser
        }
        return api;


        function allUser() {
            return $http.get("/api/user");
        }

        function updateUserQueue(uid,queue) {
            return $http.post( "/api/user/"+uid+"/updateQueue",queue);
        }

        function deleteSongFromQueue(uid,videoId){
            return $http.get("/api/user/"+uid+"/deleteSong/"+videoId);
        }

        function addSong2Recent(recentObj,uid) {
            //recentObj= {title,url,videoId}
            return $http.post("/api/user/"+uid+"/recent",recentObj);
        }

        function findUserByUsername(username) {
            var user={username:username};
            var url = "/api/user";
            return $http.post(url,user);
        }


        function addSong2UserQueue(uid,song) {
            return $http.get("/api/user/"+uid+"/queue1?song="+song);
        }

        function getrecentSongByUser(userId) {
            return $http.get("/api/user/"+userId+"/recent");
        }

        function findUserByCredentials(username,password) {
            var user = {username:username,password:password};
            return $http.post("/api/user",user)
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function updateUser(userid,user) {
            return $http.put("/api/user/",user);
        }

        function deleteUser(userid) {
            return $http.delete("/api/user/"+userid);
        }

        function createUser(user) {
            return $http.post("/api/user/new",user);
        }

        function getUserQueue(userId) {
            return $http.get("/api/user/"+userId+"/queue");
        }
    }
})();
