import * as express from "express";
import  controllerUser from  "../controller/user-controller"
import controller  from "../controller/employee-controller"
import auth from "../middleware/auth";

console.log("auth",auth)

// const usersRouter = Router();
let router = express.Router();
// const employee = new Employee.User();
router.get("/welcome", controller.hello);
router.post("/registerEmployee", controller.insertData);
router.get("/getalldata", controller.getallData);
router.post("/updateData/:id", controller.updateData);
router.delete("/deleteData/:id",controller.deletedata);
router.post("/registerUser",controllerUser.registerData)

router.get("/verifyUser",auth.verifyToken,controllerUser.verfiyUser)
router.post("/register",controllerUser.register)
router.post("/login",controllerUser.login)
// router.get('/userOrders', (req, res) => {
//     // executes after authenticateToken
//     // ...

//     console.log(auth)
//   })
// console.log("log in",controllerUser.registerData);
 export default router;