import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
var UserSchema = new Schema({
  name:{type: String,required:true},
  email:{type: String,required:true,unique:true,index: true},
  password : {type: String,required:true},
  role:{type:String,required:true}

  });
  export default mongoose.model('User', UserSchema);
//   UserSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password, this.hash_password);
//   };
// UserSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.created));
// };

// const UserSchema = new Schema({
//     username: {type: String},
//     password: {type:String}
// });
// mongoose.model('User', UserSchema);
 