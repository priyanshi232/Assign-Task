const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
     name: {
        type:String,
        required: true
     },
     email: {
        type:String,
        required: true,
        unique: true
     },
     password: {
        type:String,
        required: true
     }
}) 

// now we need to create a collection 
userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
     // const passwordHash =await bcrypt.hash(password, 10);
      this.password = await bcrypt.hash(this.password , 10);
      console.log(`passwors id ${this.password}`);
      
    }
 
   next();
})
const Register = new mongoose.model("Register" , userSchema)

module.exports= Register;