import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';
import Employee from '../modules/employee-model'


// Baisc APi GET
async function hello(req: Request, res: Response, next: NextFunction) {
  res.status(200).send("welcome");
}

// To insert data in db
async function insertData(req: Request, res: Response)
{
try{
  const employeedata=new Employee({
    // _id:+1,
    emp_first_name:req.body.firstName,
    emp_middle_name:req.body.middleName,
    emp_last_name:req.body.lastName,
    emp_age:req.body.empAge,
    emp_personal_emailId:req.body.empPersonalEmailId,
    emp_mobile_no:req.body.empMobileNo
  })
const datainsert=await employeedata.save()
console.log("....")
res.status(200).send(datainsert);
}
catch{
  res.status(400).send("unable to save data to database");
}
}


// To Get all Data
async function getallData(req: Request, res: Response){ 
    Employee.find() 
    .then((result:any) => {
        res.send(result);
    }).catch((err:any) => {
        res.status(400).send(err);
    })
}


// To update the data in db
const updateData= async (req: Request, res: Response) => {
  try{  
  console.log(req.params.id,req.body.firstName)
    const result=await Employee.findByIdAndUpdate({_id:req.params.id},{
      $set:{
        emp_first_name:req.body.firstName,
        emp_middle_name:req.body.middleName,
        emp_last_name:req.body.lastName,
        emp_age:req.body.empAge,
        emp_personal_emailId:req.body.empPersonalEmailId,
        emp_mobile_no:req.body.empMobileNo
      }
    },{ new: true }) 
    res.status(200).send(result)
  }
  catch(err){
    console.log(err)
  }
}

// To delete data from db
const deletedata= async (req:Request, res:Response)=>{
  try{ 
console.log(req.query.id)
const result= await Employee.deleteOne({id:req.query.id},{new:true})
res.send(result)
  }
  catch(err)
  {
console.log(err)
  }
}


const login=async (req:Request, res:Response)=>{
  try{ }
  catch{}
}


export default { hello , insertData,getallData,updateData,deletedata};






