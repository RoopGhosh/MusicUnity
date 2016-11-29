module.exports = function () {
    var mongoose = require("mongoose");
    var PlaylistSchema = mongoose.Schema({
        private:Boolean,
        _user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"},
        songs:[String]
    }, {collection: "playlist"});
    return PlaylistSchema;
};