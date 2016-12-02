module.exports = function () {
    var mongoose = require("mongoose");
    var LikeSchema = mongoose.Schema({
        song:String,
        _user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"},
    }, {collection: "like"});
    return LikeSchema;
};