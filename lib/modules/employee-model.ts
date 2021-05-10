import * as mongoose from 'mongoose';
import * as Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);

var employee = new mongoose.Schema({
    _id: Number,
    emp_first_name: {
        type: String,
        required: true
        
    },
    emp_middle_name: {
        type: String
    },
    emp_last_name: {
        type: String
    },
    emp_age: {
        type: Number
    },
    emp_personal_emailId:{
        type: String,
        required: true
    },
    emp_mobile_no:{
        type: Number,
           }
},{ _id: false })

employee.plugin(AutoIncrement, {inc_field: '_id'});

employee.index({ _id: 1, seq: 1 }, { unique: true })
export default mongoose.model(
    "Employee",
    employee
)




