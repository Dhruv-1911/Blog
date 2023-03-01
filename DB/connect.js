const mongoose = require("mongoose");

const connect_db =mongoose.connect('mongodb+srv://dhruv:' + process.env.Mongo_password + '@blog.uslpn7g.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connect to Databse..")
    })
    .catch((err) => {
        console.log(err);
    })

module.exports=connect_db;