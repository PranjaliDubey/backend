import * as express from "express";
import  controllerUser from  "../controller/user-controller"
import controller  from "../controller/employee-controller"


// const usersRouter = Router();
let router = express.Router();
// const employee = new Employee.User();
router.get("/welcome", controller.hello);
router.post("/insertdata", controller.insertData);
router.get("/getalldata", controller.getallData);
router.post("/updateData/:id", controller.updateData);
router.delete("/deleteData/:id",controller.deletedata);
// router.post("/registerUser",controllerUser.registerData)
// console.log("log in",controllerUser.registerData);
 export default router;