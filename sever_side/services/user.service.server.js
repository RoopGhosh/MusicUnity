/**
 * Created by roopghosh on 11/29/16.
 */
module.exports = function (app,model) {
    app.get("/api/user/:uid",findUserById);
    app.post("/api/user",findUserByCredentials);
    app.put("/api/user",updateUser);
    app.delete("/api/user/:uid",deleteUser);
    app.post("/api/user/new",createUser);
    app.get("/api/user/queue",getUserQueue);


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
        model.userModel.findUserbyCredentials(username,password)
            .then(
                function (body) {
                    if(body){
                        res.send(body)
                    }else{
                        console.log("NO USER FOUND");
                        res.sendStatus(404).send('0');
                    }
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
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