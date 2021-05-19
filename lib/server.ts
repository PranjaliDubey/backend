// import app from "./config/app";
// import env from "./config/sytem-config"
import router from  "./routes/employee-routes"
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// import app from "./config/app";
import * as express from "express";
import  authenticateToken from '../lib/middleware/auth';
const PORT =process.env.PORT || 5000;
const app = express();
dotenv.config();// access config var
 process.env.JWT_SECRET_KEY;
 console.log("process.env.PORT",process.env.mongoString )
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

const mongoString= "mongodb+srv://pranjali:pranjali123@cluster0.6si2q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


// mongo "mongodb+srv://cluster0.6si2q.mongodb.net/myFirstDatabase" --username <username>
app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`)
})
// app.use(express.json)

app.use("/api", router);

app.use("*", (req, res) => {
    return res.status(404).send({ success: false, error: 'invalid api call' });
});

mongoSetup();

// Db connection
function mongoSetup() {
    // mongoose.Promise = global.Promise;
    mongoose.connect(process.env.mongoString, { useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false  ,useCreateIndex: true});
    const db = mongoose.connection
    db.on('error', (err) => {
        console.log("Error while connecting DB", err);
    })
    db.once('open', () => {
        console.log("DB Connected!!!");
    })
}


