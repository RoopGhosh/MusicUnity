/**
 * Created by roopghosh on 11/29/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.model.server")();
    var CommentModel = mongoose.model("CommentModel", CommentSchema);
    var api = {
        createComment:createComment,
        //updateComment:updateComment
        deleteComment:deleteComment,
        readComment:readComment,
        getCommentByUser:getCommentsByUser,
        getCommentForUser:getCommentForUser,
    };
    return api;


    function createComment(comment) {
        return CommentModel.create(comment);
    }

    function deleteComment(commendId) {
        return CommentModel.remove({
            _id:commendId
        });
    }

    function readComment(commentId) {
        return CommentModel.findOne({
            _id:commentId
        });
    }

    function getCommentByUser(userId) {
        return CommentModel.find(
            {_user:userId}
        );
    }


    function getCommentForUser(userId) {
        return CommentModel.find({
            forUser:userId
        });
    }

}