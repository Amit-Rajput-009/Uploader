const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Node = require('../database/models/files.model');
const { verifyToken } = require('../middleware/middleware');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
//Local Storage routes

router.post('/creatFolder',verifyToken,async (req,res) => {
  let folderName=req.body.folderName;
  let parentId=req.body.parentId || null ;
  let creatorId = req.body.userId;

  // logic for same name folder
  let isExist =await isExistInDB(folderName,parentId);
  if(isExist)
    return res.status(409).json({success :false ,message:'This folder name already exist'})
  else{
    try{
      let response=await createFolder(folderName,parentId,creatorId);
      if(response){
        res.status(201).json(response);
      }else{
        res.status(400).send('folder not created')
      }
      }catch(e){
        console.log("ERROR IN CREATING FOLDER");
        console.log(e);
        res.status(400).json({message:'Failed to Create Folder'});
      }
  }
});


router.post('/createFile',verifyToken,upload.single('files'),async (req,res) => {

  if (req.file) {
    let fileName = req.file.filename; // Get the unique filename
    let fileType =  req.file.destination.replace("uploads/","");
    let parentId = req.body.parentId || null ;
    let creatorId = req.body.userId;
    // console.log(creatorId," Creator Id ",parentId," Parent Id");
    // const downloadLink = path.join(req.baseUrl, 'uploads', fileName); // Construct download link

    let isExist =await isExistInDB(req.file.originalname,parentId);
    if(isExist)
      return res.status(409).json({success :false ,message:'This folder name already exist'})
    else{
      const downloadLink = process.env.baseURL + fileType + fileName ;
      console.log("Your link:- "+downloadLink);
      try{
        let response= await createFile(req.file.originalname,parentId,creatorId,downloadLink,fileType);
        console.log(response);
        if(response){
          res.status(201).json(response);
        }else{
          res.status(400).send('file is not created')
        }
        }catch(e){
          console.log("ERROR IN CREATING FILE 2");
          console.log(e);
          res.status(400).json({message:'Failed to Create File'});
        }
    }

  } else {
    res.status(400).json({ message: 'Error uploading file' });
  }
});



router.get('/download/:type/:filename',verifyToken, (req, res) => {
  const fileName = req.params.filename; // Get filename from URL parameter
  const fileType = req.params.type; // Get file type from URL parameter
  const filePath = path.join(__dirname, `../uploads/${fileType}`, fileName);
  console.log("filePath:- ",filePath);
  try {
    const data = fs.readFileSync(filePath);
    console.log(data);
    const contentType = 'application/pdf'; 
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(data);
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).send('Error downloading file');
  }
});


// Util functions

async function isExistInDB(docName,parentId){
  let node =await Node.findOne({name:docName ,parent : parentId});
  if(!node)return false;
  else return true;
}
const createFile = async  (fileName, parentId, creatorId, downloadLink, fileType) => {
  try {
    console.log(fileName + parentId + creatorId + downloadLink, fileType);
    const newFile = new Node();
    newFile.isFolder = false;
    newFile.name = fileName;
    newFile.url = downloadLink;
    newFile.creator = creatorId;
    newFile.parent = parentId;
    let asd = fileType.replace('/',"");
    newFile.fileType = asd;
    console.log(newFile);
    if(parentId){
      const parentNode = await Node.findById(parentId);
      console.log('parent Node before',parentNode);
      parentNode.children.push({name:newFile.name});
      await parentNode.save();
      const parentNode2 = await Node.findById(parentId);
      console.log('parent Node After',parentNode2);
    }
    const res = await newFile.save();
    console.log("res" + res);
    return res;
  } catch (error) {
    console.log("Error In creating file 1 "+error)
  }
}
const createFolder = async  (folderName, parentId, creatorId) => {
  try {

    // console.log(folderName + parentId + creatorId);
    const newFolder = new Node();
    newFolder.name = folderName;
    newFolder.creator = creatorId;
    newFolder.isFolder = true;
    newFolder.parent = parentId;

    if(parentId){
      const  parentNode = await Node.findById(parentId);
      parentNode.children.push(newFolder._id);
      await parentNode.save();
    }

    return await newFolder.save();
  } catch (error) {
    console.log("Error In creating folder "+error)
  }
}
module.exports = router;