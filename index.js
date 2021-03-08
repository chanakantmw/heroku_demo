const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const port = process.env.PORT || 5000;
const urlPublice = 'mongodb+srv://iboxconnect:ibox12345678@cluster0.2wpyq.mongodb.net/AppDB?retryWrites=true&w=majority';

mongoose.connect(urlPublice, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log(" MongoDB connected !!");
});

//----------------------------------------------------------------------------------------------------------------
//middleware
const User = Schema({
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    email: { type: String, required: true, },
});

//----------------------------------------------------------------------------------------------------------------

app.use(express.json());
const myColl = mongoose.model('users', User)
app.route("/api").get(async(_req, res) => {
    var result = await myColl.find({}).sort({
        _id: -1,
    }).limit(500);
    res.json(result)
})

/* app.get('/api1', async(_req, res) => {

    var result = await myColl.find({}).sort({ _id: -1, }).limit(500);
    res.json(result)
}) */

/* app.get("/get", (req, res) => res.json("test get"));
app.route("/test").get((req, res) => res.json("test"));
app.route("/welcome").get((req, res) => res.json("Welcome")); */

app.listen(port, () => console.log(`welcome your listinnig at port ${port}`));