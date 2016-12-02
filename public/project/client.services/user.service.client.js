/**
 * Created by Amardeep on 11/10/16.
 */
(function () {
    angular
        .module("MusicUnity")
        .factory("UserService",UserService);



    function UserService($http) {
        var api={
            createUser:createUser,
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            deleteUser:deleteUser,
            updateUser:updateUser,
            createUser:createUser,
            findUserByUsername:findUserByUsername,
            getUserQueue:getUserQueue
        };
        return api;

        function findUserByUsername(username) {
            var user={username:username};
            var url = "/api/user";
            return $http.post(url,user);

        }

        function findUserByCredentials(username,password) {
            var user = {username:username,password:password};
            return $http.post("/api/user",user)
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function updateUser(userid,user) {
            return $http.put("/api/user/"+userid,user);
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
