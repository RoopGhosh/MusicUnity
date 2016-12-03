module.exports = function () {
    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
        _user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}, //todo
        comment:String
    }, {collection: "comment"});
    return CommentSchema;
};