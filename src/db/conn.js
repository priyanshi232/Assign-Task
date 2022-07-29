const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/users_db" , {
    useNewUrlParser: true ,
    useUnifiedTopology:true ,
   // useCreateIndex: true 
}).then( ()=> {
    console.log("connection is established ... ");
}).catch( (err)=> {
    console.log(err);
})