const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const { use } = require("./routes/user");
//const router = require("./routes/user");

const port = process.env.PORT || 5000;
const urlPublice = 'mongodb+srv://iboxconnect:ibox12345678@cluster0.2wpyq.mongodb.net/AppDB?retryWrites=true&w=majority';
const collectionName = 'coll_nubox';

mongoose.connect(urlPublice, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log(" MongoDB connected !!");
});




////////////
//----------------------------------------------------------------------------------------------------------------
//middleware
const User = Schema({
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    email: { type: String, required: true, },
});

const CollNubox = Schema({
    status: { type: String },
    timeStamp: { type: String },
    snapPath: { type: String }
});

//----------------------------------------------------------------------------------------------------------------

app.use(express.json());
//const userRoute = require("./routes/user");
//app.use("/user", userRoute);

const myColl = mongoose.model(collectionName, CollNubox)
    /* app.route("/api").get(async(_req, res) => {
        var result = await myColl.find({}).sort({
            _id: -1,
        }).limit(500);
        res.json(result)
    })
     */
app.get('/', async(_req, res) => {

    var result = await myColl.find({}).sort({
        _id: -1,
    }).limit(500);
    res.json(result)
})

//app.route("/test").get((req, res) => res.json("test"));
//app.route("/").get((req, res) => res.json("Welcome"));
app.listen(port, () => console.log(`welcome your listinnig at port ${port}`));