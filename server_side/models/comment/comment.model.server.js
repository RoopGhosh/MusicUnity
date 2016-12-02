/**
 * Created by roopghosh on 11/29/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server")();
    var CommentModel = mongoose.model("CommentModel", CommentSchema);
    var api = {
        createComment:createComment,
        //updateComment:updateComment
        deleteComment:deleteComment,
        getCommentById:getCommentById,
        getCommentByUser:getCommentByUser,
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

    function getCommentById(commentId) {
        return CommentModel.findById(commentId);
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