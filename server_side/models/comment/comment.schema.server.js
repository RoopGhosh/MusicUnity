module.exports = function () {
    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
        comment:String,
        _user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"},
        forUser:[{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}]
    }, {collection: "comment"});
    return CommentSchema;
};