module.exports = function (app) {
    var model =  require("./server_side/models/models.server")();
    require("./services/user.service.server.js")(app,model)
    require("./services/comment.service.server.js")(app,model)
    require("./services/like.service.server.js")(app,model)
    require("./services/playlist.service.server.js")(app,model)
};
