const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Node = require('../database/models/files.model');
const User = require('../database/models/user.model');
const { verifyToken } = require('../middleware/middleware');
const axios = require('axios');
const path = require('path');
const fs = require('fs');


router.get("/:userId", async (req,res)=>{
    let userId= req.params.userId;
    if(userId === null || ""){
        return res.status(401).json({message:"User ID is required"});  
    }else{
        try {
            const user = await User.findById(userId).select('email role');
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }  
})

module.exports = router;