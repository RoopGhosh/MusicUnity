/**
 * Created by Amardeep on 13/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
   // var WebsiteSchema= require("../website/website.schema.server");// we can use this and as add webistes as an array in users website:WebsiteSchema
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "user"});

    return UserSchema;
};
