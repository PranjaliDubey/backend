import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from  'jsonwebtoken';
import User from '../modules/employee-model';
import { Request, Response } from 'express';
import  authenticateToken from '../middleware/auth'

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

async function registerData(request:Request, response:Response){
  var hashedPassword = bcrypt.hashSync(request.body.password, 8);
  console.log("...",hashedPassword)
    // const token = generateAccessToken({ username: request.body.username });
    // response.json(token);
    User.create({
      name : request.body.name,
      email : request.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return response.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      response.status(200).send({ auth: true, token: token });
    }); 

}
// export default data="Abc"

 export default { registerData };
