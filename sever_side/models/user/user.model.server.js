/**
 * Created by Amardeep on 13/11/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;
    function setModel(_model) {
        model = _model;
    }
    function createUser(user) {
         return UserModel.create(user);
    }

    function findUserById (userid) {
        //find will return an array while findbyById will give an object
        return UserModel.findById(userid);
    }
    function updateUser(user,userId) {
        return UserModel
            .update(
                {
                    _id:userId
                },//filter
                {
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email
                }
                // new value
            );
    }
    function findUserByCredentials(username,password) {
        return UserModel
            .findOne({
                username:username,
                password:password
            })
    }
    function findUserByUsername(username) {
        return UserModel
            .findOne({
                username:username
            })
    }
    function deleteUser(userId) {
        return UserModel
            .remove({
                _id:userId
            })
    }
};
