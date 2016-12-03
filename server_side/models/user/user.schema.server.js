module.exports = function () {
    var mongoose = require("mongoose");
   // var WebsiteSchema= require("../website/website.schema.server");// we can use this and as add webistes as an array in users website:WebsiteSchema
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone:String,
        city:String,
        url:String,
        services:[{type:String, enum:['Youtube','Soundcloud']}],
        gender:{type:String,enum:['Male,Female, Do Not Share']},
        queue:[String],
        recentSong:[String],
        following: [{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});
    return UserSchema;
};
