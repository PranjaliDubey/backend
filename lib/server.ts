// import app from "./config/app";
// import env from "./config/sytem-config"
import router from  "./routes/employee-routes"
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// import app from "./config/app";
import * as express from "express";
const PORT =3000;;
const app = express();


// get config vars
console.log(dotenv.config());

// access config var
process.env.TOKEN_SECRET;

console.log("....",process.env.TOKEN_SECRET)
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`)
})
// app.use(express.json)

app.use("/api", router);

// app.use("*", (req, res) => {
//     return res.status(404).send({ success: false, error: 'invalid api call' });
// });

mongoSetup();

// Db connection
function mongoSetup() {
    // mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/user", { useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false });
    const db = mongoose.connection
    db.on('error', (err) => {
        console.log("Error while connecting DB", err);
    })
    db.once('open', () => {
        console.log("DB Connected!!!");
    })
}


