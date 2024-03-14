const User = require('./database/models/user.model');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; 

const user = new User();
user.email = 'test@gmail.com';
user.password = '12345'
user.role = 'admin';
// app.use(cors());

//Database Connection

const connectToDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to DB.");
      
    } catch (error) {
        console.log(`Error connecting to the database: ${error}`);
        process.exit(1);
    }
  }

  connectToDb();

app.use(cors());

app.use(bodyParser.json());

app.post('/login',(req,res)=>{
  // return  user.loginUser(req.body).then((data)=> res.send({message : data})).catch((err)=> res.status(400).send(err));
   let email= req.body.email;
   let password = req.body.password;

   if(!email||!password){
       return res.status(400).send({msg:"Please provide an email and a password"});
   }

   user.comparePassword(password,email,(err,isMatch)=> {
    if(err) throw err;
    
    if(!isMatch) return res.status(401).send({ msg: "Wrong email or password." });

    //Respond with JSON web token that contains id of the user
    const token = jwt.sign({data: user._id}, process.env.SECRET);
    res.json({token:'Bearer '+token, user: user._id})
   })
});

app.get('/greet', async (req, res) => {
// res.status(200).send("Hello");
// await user.save()
res.status(200).send(JSON.stringify(user));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
