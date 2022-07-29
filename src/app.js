const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bcrypt = require('bcryptjs')
const app =express()

require('./db/conn')
// importing collection module
const Register = require("./models/registration")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname , "..public/css");
const template_path = path.join(__dirname , "../templates/views");
const partials_path = path.join(__dirname , "../templates/partials");

app.use(express.json())
app.use(express.urlencoded({extended:false}));

//console.log(path.join(__dirname  ));
app.use(express.static(static_path));
app.set("view engine" , "hbs");
app.set("views" , template_path);
hbs.registerPartials(partials_path );


app.get('/' , (req , res )=>{
     res.render("register_login");
})
app.get('/register' , (req , res )=>{
     res.render("registration");
})
// insert a new user in our database 
app.post('/register' , async(req , res )=>{
    try{
     //    console.log(req.body.uname);
     //    res.send(req.body.uname); 

     // storing data in to db
      const registerUser = new Register({
          name : req.body.uname,
          email : req.body.email,
          password : req.body.psw
      })
      


      const registered = await registerUser.save();
      res.status(201).render("index");

    }catch(e){
        res.status(400).send(e);
    }
})


// login 
app.get('/login' , (req , res )=>{
    res.render("login");
})
app.post('/login' , async(req , res )=>{
  
    try{
        const email =req.body.email;
        const password =req.body.psw;
       
        console.log(`${email} and password is ${password}`)
        const usermail = await Register.findOne({email:email})
        // res.send(usermail)
         console.log(usermail)
        
         // comparing bcrypt password
        const isMatch = bcrypt.compare(password , usermail.password);
        
        if(isMatch){
           res.send(`Welcome  ${usermail.name}!`);

        // if(usermail.password === password){
        //    res.send(`Welcome  ${usermail.name}!`);
            
        }
        else{
            res.send("wrong password/email, try again ")
        }
    }catch(e){
        res.status(400).send("invalid email")
    }
})

// hashing and encryption 
// hashing is one way , encryption is two way
// let pavi code word is , pavi =>  sdfgg    , now sdfgg =>pavi 
// in hashing , pavi =>abc.djdhf.djj ,   abc.djdhf.djj => not posssible

// const bcrypt = require('bcryptjs')

// securePassword("")





app.listen( port , (err)=>{
    if(err)
     console.log(err);
    else
     console.log("server is runing ");
})