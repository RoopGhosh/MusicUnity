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
            findUserByUsername:findUserByUsername,
            deleteUser:deleteUser,
            updateUser:updateUser,
           // login: login,
            //checkLogin: checkLogin,
            //logout: logout
        };
        return api;

        // function logout() {
        //     return $http.post("/api/logout");
        // }
        //
        // function checkLogin() {
        //     return $http.post("/api/checkLogin");
        // }
        //
        // function login(username, password) {
        //     var user = {
        //         username: username,
        //         password: password
        //     };
        //     return $http.post("/api/login", user);
        // }
        function createUser(newuser) {
            //return users;
            return $http.post("/api/user", newuser);
            
        }
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);

        }
        function updateUser(updatedUser,id) {
            var url = "/api/user/" + id;
            return $http.put(url, updatedUser);


        }
        function findUserByCredentials (username,password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);

        }
        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }
        function deleteUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }
    }
})();
