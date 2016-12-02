/**
 * Created by roopghosh on 11/29/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var LikeSchema = require("./Like.schema.server")();
    var LikeModel = mongoose.model("LikeModel", LikeSchema);
    var api = {
        createUpdateLike: createUpdateLike,
        //updateLike:updateLike,
        deleteLike: deleteLike,
        readLike: readLike,
        getLikeByUser: getLikeByUser,
        getLikeBySong: getLikeBySong,
        getLikeByUserAndSong:getLikeByUserAndSong
    };
    return api;


    function getLikeByUserAndSong(userid,song) {
        return LikeModel.find({
            _user:userid,
            _song:song
        });
    }


    function createUpdateLike(like) {
        //searches if there is a like for a song by the user. if yes it updates else it creates.
        return LikeModel.find({
            _song:like._song,
            _user:like._user
        })
            .then(
                function(resultSet){
                    if(resultSet){
                        return LikeModel.update({_id:resultSet._id},{count:like.count});
                    }else{
                        return LikeModel.create(like)
                    }
                }
            );
    }

    function deleteLike(userId,song) {
        getLikeByUserAndSong(getLikeByUserAndSong)
            .then(
                function (response) {
                    return LikeModel.remove({_id:response._id});
                },
                function (error) {

                }
            )
    }

    function readLike(likeId) {
        return LikeModel.findById(likeId);
    }

    function getLikeByUser(userId) {
        return LikeModel.find({
            _user:userId
        });
    }

    function getLikeBySong(songId) {
        return LikeModel.find({
            _song:songId
        });
    }
}
