import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from  'jsonwebtoken';
import User from '../modules/user-model';
import { NextFunction, request, Request, Response } from 'express';
import  authenticateToken from '../middleware/auth';


async function generateAccessToken(username) {
  console.log(username,process.env.JWT_SECRET_KEY)
    return jwt.sign(username, process.env.JWT_SECRET_KEY, { expiresIn: '1day' });
  }

  // Registeriation of the Data
async function registerData(request:Request, response:Response, next: NextFunction){
  var hashedPassword = bcrypt.hashSync(request.body.password, 8);
  const user=new User({
    // _id:+1,
    name : request.body.name,
    email : request.body.email,
    password : hashedPassword
  });
  try{
  const token = await generateAccessToken({ username: request.body.username });
    const userData= await user.save()
    // next()
     response.json(token);
      } 
  catch(err){
    console.log(err)
    response.status(201);
  }


}
// to check
async function verfiyUser(req:Request, res:Response, next: NextFunction) {
  User.findById(req.body.userId,function (err:any, user:any) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });

};


// export default data="Abc"

async function register(req, res) {
  const password =req.body.password
  
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)===false || password.length <= 8 )
  {
        res.send("please enter correct password or email")
  }
  else{
  var hashedPassword = bcrypt.hashSync(password ,8);
  
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword,
    role:req.body.role
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id },  process.env.JWT_SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 
}
}

// Login Api
async function login(req: Request, res: Response)
{
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    

}
 export default { registerData,verfiyUser,register,login };
