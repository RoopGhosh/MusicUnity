/**
 * Created by roopghosh on 12/2/16.
 */
(function () {
    angular
        .module("MusicUnity")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var api = {
            findCommentById:findCommentById,
            findCommentByUser:findCommentByUser,
            findCommentForUser:findCommentForUser,
            deleteComment:deleteComment,
            createComment:createComment
        }
        return api;
    }
})();

