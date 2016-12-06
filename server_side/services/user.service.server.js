/**
 * Created by roopghosh on 11/29/16.
 */
module.exports = function (app,model) {

    var mime = require('mime');
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/project/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });
    app.get("/api/user/:uid",findUserById);
    app.post("/api/user",findUser);
    app.put("/api/user",updateUser);
    app.delete("/api/user/:uid",deleteUser);
    app.post("/api/user/new",createUser);
    app.get("/api/user/:uid/queue",getUserQueue);
    app.post("/api/user/:uid/recent",addRecentSongByUser);
    app.get("/api/user/:uid/recent",getRecentSongByUser);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/user/:uid/queue1",addSong2UserQueue);

    function addSong2UserQueue(req,res) {
        var userId=req.params.uid;
        var song=req.query.song;
        model.userModel.findUserById(userId)
            .then(
                function (user) {
                    var queue = user.queue;
                    queue.push(song);
                    model.userModel.addsong2Queue(user._id,queue)
                        .then(
                            function (response) {
                                res.send(200);
                            },
                            function (error) {
                                console.error("while adding song to queue");
                            }
                        )

                },
                function (error) {
                    console.log(error + "error adding sont ot queue in server user service")
                }
            )
    }
    function createUser(req,res) {
        var user  = req.body;
        model.userModel.createUser(user)
            .then(
                function (user) {
                    res.send(user._id);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }
    function findUser(req, res) {
        if(req.body.password){
            findUserByCredentials(req,res)
        }
        else{
            findUserByUsername(req,res);
        }
        // var params = req.params;
        // var query = req.query;
        // if(query.password && query.username) {
        //     findUserByCredentials(req, res);
        // } else if(query.username) {
        //     findUserByUsername(req, res);
        // }
    }

    function getRecentSongByUser(req,res) {
        var userid = req.params['uid'];
        model.userModel.findUserById(userid)
            .then(
                function (userObj) {
                    res.send(userObj._doc.recent);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            )
    }

    function addRecentSongByUser(req,res) {
        var userId = req.params.uid;
        var song = req.body;
        model.userModel.findUserById(userId)
            .then(
                function (user) {
                    var recentSongList = user._doc.recent;
                    var flag = true;
                    flag = isDuplicate(recentSongList,song);
                    if(!flag){
                        recentSongList.push(song);
                    }
                    model.userModel.addsong2Recent(user._id.toString(),recentSongList)
                        .then(
                            function (response) {
                                res.send(200);
                            },
                            function (error) {
                                console.error("while adding song to recent list");
                            }
                        )
                },
                function (error) {
                    console.log(error + "error adding song to recent in server user service")
                }
            )
    }

    function isDuplicate(recentSongs,song) {
        for(var i in recentSongs){
            if(recentSongs[i].videoId==song.videoId){
                return true;
            }
        }
        return false;
    }

    function findUserById(req,res){
        var id = req.params.uid;
        model.userModel.findUserById(id)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req,res){
        var user  = req.body;
        var username = user.username;
        var password = user.password;
        model.userModel.findUserByCredentials(username,password)
            .then(
                function (body) {
                    if(body){
                        res.send(body)
                    }else{
                        console.log("NO USER FOUND");
                        res.send('0');
                    }
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.body.username;
        model.userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }
                }),
            function (error) {
                res.statusCode(400).send(error);
            }
    }

    function updateUser(req,res){
        var user = req.body;
        model.userModel.updateUser(user,user._id)
            .then(
                function (body) {
                    res.send();
                },
                function (error) {
                    console.log(error);
                    res.send(error + "error updating in server");
                }
            );
    }

    function deleteUser(req,res){
        var uid= req.params['uid'];
        model.userModel.deleteUser(uid)
            .then(
                function (body) {
                    res.send(body)
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getUserQueue(req,res){
        var id = req.params.uid;
        model.userModel.getUserQueue(id)
            .then(
                function (response) {
                    //reverse the array
                    response.queue.reverse();
                    res.send(response)
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }

    function uploadImage(request, response) {
        var userId= request.body.userId;
        var myFile        = request.file;
        console.log(myFile.filename)
        model.userModel.findUserById(userId)
            .then(function (user) {
                user.url="uploads/" + myFile.filename
                model.userModel.updateUser(user,userId)
                    .then(function (updatedUser) {
                        console.log(updatedUser);
                        response.redirect("/project/#/user/" + userId + "/profile");
                    })
            })

    }

}