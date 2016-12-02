/**
 * Created by roopghosh on 11/29/16.
 */
module.exports = function (app,model) {
    app.get("/api/user/:uid",findUserById);
    app.post("/api/user",findUser);
    app.put("/api/user",updateUser);
    app.delete("/api/user/:uid",deleteUser);
    app.post("/api/user/new",createUser);
    app.get("/api/user/:uid/queue/",getUserQueue);


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
        model.userModel.updateUser(user._id,user)
            .then(
                function (body) {
                    res.send();
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
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
                    res.send(response)
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }

    /*createUser: createUser,
     findUserById: findUserById,
     findUserByCredentials: findUserByCredentials,
     findUserByUsername: findUserByUsername,
     updateUser: updateUser,
     deleteUser: deleteUser,
     getUserQueue:getUserQueue*/

}