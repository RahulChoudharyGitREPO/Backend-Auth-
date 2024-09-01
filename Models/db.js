const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONNECTION

mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB_Connected");
    }).catch((err) => {
        console.log("Mongo Connection Error", err)
    })