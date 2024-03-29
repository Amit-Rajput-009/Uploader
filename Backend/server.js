const User = require('./database/models/user.model');
const Node = require('./database/models/files.model');
const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; 
const {verifyToken} = require('./middleware/middleware');
const connectToDb = require('./database/db');
const FileUploader = require('./controller/uploads');

//Database Connection
  connectToDb();

app.use(cors());
app.options('*', cors()) // enable
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

//Authentication End points

app.post('/login',async (req,res)=>{
   const email= req.body.email;
   let password = req.body.password;


   if(!email||!password){
       return res.status(400).send({msg:"Please provide an email and a password"});
   }
   else{
    const user = await User.findOne({email:email});

    if(user){
      const match = await comparePasswords(password,user.password)
      if(!match){
        res.status(401).send({auth:false, msg:'Invalid Email or Password'});
      }else{
          const token = createToken(user); 
          const logedUser =  {user,token : token} ;
          
          res.header("logedUser", logedUser).send(logedUser);
      }
    }
    else{
      res.status(400).send({msg:"Email does not exist."})
    }
   
   }

});

app.post('/register',(req,res)=>{

  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  let adminMail = req.body.admin;

  User.findOne({email:adminMail}).then(async (admin)=>{
    if(admin.role === 'admin')
    {
      const userExist = await User.findOne({email:email})
      if(!userExist){
        password = await hashPassword(password);
     
           const newUser = new User({
             email : email,
             password : password.toString() ,
             role : role ? role : 'user',
         });
         newUser.save();
         res.status(201).send(newUser._id);
         }
         else{
          res.status(403).send(`${email} already exists! please try to login`);
         }
    }

 else{
    res.status(403).send('You are not authorized to perform this action');
    }
})
  });


  // Local storage End Points 

app.get('/api/documents/localstorage',verifyToken,async (req,res)=>{
  // const userId = req.params.userId;
  const userId = req.user;
  const userDocs =await Node.find({creator:userId})
 console.log(JSON.stringify(userDocs));
  res.json(userDocs);
})

// app.post('/api/documents/localstorage/createDocument', verifyToken,upload.array('files',2), (req, res) => {
//   let docName=req.body.docName?req.body.docName:'Untitled Document';
//   let creator = req.body.userId?req.body.userId:req.user;
//   let isFolder = req.body.isFolder?req.body.isFolder:false;
//   console.log(req.file);
//   res.send("Something happens?")
  
//   // Host file and save URL.

// });
app.use('/api/documents/localstorage',FileUploader);
// Utility Endpoints
app.get('/greet', async (req, res) => {
  
// res.status(200).send("Hello");
// await user.save()
// res.status(200).send(JSON.stringify(user));
});
// 65f3eec33b87ca97ee4415fe
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYzZWVjMzNiODdjYTk3ZWU0NDE1ZmUiLCJpYXQiOjE3MTA0ODkwNDUsImV4cCI6MTcxMTA5Mzg0NX0.pVwG2zX3icnifpnFsh6l3pycHHTYD4RgE5bPiP4EhvM

//Functions

async function hashPassword(password) {
  try {
      // console.log("logging Password "+password);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log("Hashed password "+ hashedPassword);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}
const createToken = (user)=>{
  let token=jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'7d'});
  console.log("Your Token is: "+token);
return token;
}
async function comparePasswords(password, hashedPassword) {
  try {
    // console.log(password+ " " + hashedPassword )
    const match = await bcrypt.compare(password, hashedPassword);
    // console.log(match);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}


app.listen(port, () => console.log(`Server listening on port ${port}`));
