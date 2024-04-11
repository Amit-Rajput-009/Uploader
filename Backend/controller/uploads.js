const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Node = require("../database/models/files.model");
const { verifyToken } = require("../middleware/middleware");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
//Local Storage routes

router.post("/creatFolder", verifyToken, async (req, res) => {
  let folderName = req.body.folderName;
  let parentId = req.body.parentId || null;
  let creatorId = req.user._id;
  // console.log(parentId);
  if (!creatorId) {
    res.status(401).json({ message: "Unauthorized access!" });
  }
  console.log("parentId:- ", parentId);
  // logic for same name folder
  let isExist = await isExistInDB(folderName, parentId);
  if (isExist)
    return res
      .status(409)
      .json({ success: false, message: "This folder name already exist" });
  else {
    try {
      let response = await createFolder(folderName, parentId, creatorId);
      if (response) {
        res.status(201).json(response);
      } else {
        res.status(400).send("folder not created");
      }
    } catch (e) {
      // console.log("ERROR IN CREATING FOLDER");
      // console.log(e);
      res.status(400).json({ message: "Failed to Create Folder" });
    }
  }
});
router.post("/deleteFolder", verifyToken, async (req, res) => {
  let folderName = req.body.folderName;
  let userId = req.user._id;
  let currentfolderId = req.body.folderId;
  // console.log(userId + "-" + currentfolderId + "-" + folderName);
  const NodeToDelete = await Node.findById(currentfolderId);
  
if(NodeToDelete.name  != folderName){
return res.status(403).json('You are trying to delete a different node')
}
if(!NodeToDelete){
  return res
        .status(404)
        .json({ success: false, message: "This folder does not exist!" });
}else{
  if (userId != NodeToDelete.creator) {
    return res
      .status(403)
      .json({ message: "You are not authorised to delete this folder." });
  } else {
      try {
        let response = await deleteFolder(NodeToDelete);
        if (response) {
          res.status(201).json(response);
        } else {
          res.status(400).send("folder not deleted");
        }
      } catch (e) {
        // console.log("ERROR IN CREATING FOLDER");
        // console.log(e);
        res.status(400).json({ message: "Failed to Delete Folder" });
      }
    
  }
}
});

router.post("/createFile",  upload.single("files"),verifyToken,async (req, res) => {
    if (req.file) {
      let fileName = req.file.filename; // Get the unique filename
      let fileType = req.file.destination.replace("uploads/", "");
      let parentId = req.body.parentId || null;
      let creatorId = req.user._id;
      console.log(
        creatorId,
        " Creator Id ",
        parentId,
        " Parent Id",
        fileName,
        " ",
        fileType
      );
      // const downloadLink = path.join(req.baseUrl, 'uploads', fileName); // Construct download link

      let isExist = await isExistInDB(req.file.originalname, parentId);
      if (isExist)
        return res
          .status(409)
          .json({ success: false, message: "This folder name already exist" });
      else {
        const downloadLink = process.env.baseURL + fileType + fileName;
        // console.log("Your link:- "+downloadLink);
        try {
          let response = await createFile(
            req.file.originalname,
            parentId,
            creatorId,
            downloadLink,
            fileType
          );
          // console.log(response);
          if (response) {
            res.status(201).json(response);
          } else {
            res.status(400).send("file is not created");
          }
        } catch (e) {
          // console.log("ERROR IN CREATING FILE 2");
          // console.log(e);
          res.status(400).json({ message: "Failed to Create File" });
        }
      }
    } else {
      res.status(400).json({ message: "Error uploading file" });
    }
  }
);

router.get("/download/:type/:filename", (req, res) => {
  const fileName = req.params.filename; // Get filename from URL parameter
  const fileType = req.params.type; // Get file type from URL parameter
  const filePath = path.join(__dirname, `../uploads/${fileType}`, fileName);
  // console.log("filePath:- ", filePath);
  try {
    const data = fs.readFileSync(filePath);
    // console.log(data);
    const contentType = "application/pdf";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(data);
  } catch (err) {
    // console.error("Error downloading file:", err);
    res.status(500).send("Error downloading file");
  }
});

// Util functions

async function isExistInDB(docName, parentId) {
  console.log(docName, parentId);
  let node = await Node.findOne({ name: docName, parent: parentId });
  console.log(node);
  if (!node) return false;
  else return true;
}
const createFile = async (
  fileName,
  parentId,
  creatorId,
  downloadLink,
  fileType
) => {
  try {
    // console.log(fileName + parentId + creatorId + downloadLink, fileType);
    const newFile = new Node();
    newFile.isFolder = false;
    newFile.name = fileName;
    newFile.url = downloadLink;
    newFile.creator = creatorId;
    newFile.parent = parentId;
    let asd = fileType.replace("/", "");
    newFile.fileType = asd;
    // console.log(newFile);

    if (parentId) {
      const parentNode = await Node.findById(parentId);
      // console.log("parent Node before", parentNode);
      parentNode.children.push(newFile._id);
      await parentNode.save();
      const parentNode2 = await Node.findById(parentId);
      // console.log("parent Node After", parentNode2);
    }
    const res = await newFile.save();
    // console.log("res" + res);
    return res;
  } catch (error) {
    // console.log("Error In creating file 1 " + error);
  }
};

const deleteFolder = async (NodeToDelete) => {
  try {
    const node = NodeToDelete;
    if (node) {
      node.children.map(async (obj) => {
        //delete each children from database
        await deleteChildren(obj);
      });
      if (node.parent) {
        const parentNode = await Node.findById(node.parent);
        // console.log(newFolder);
        parentNode.children?.pop(node._id);
        await parentNode.save();
      }
    }

    return await Node.deleteOne({ _id: node._id });
  } catch (error) {
    console.log("Error In deleting folder " + error);
  }
};

async function deleteChildren(nodeId) {
  if (!nodeId) return;
  const node = await Node.findById(nodeId);
  if (!node) return;

  // Recursively delete children
  await Promise.all(
    node.children.map(async (childId) => {
      await deleteChildren(childId);
    })
  );
  // After all children are deleted, delete the node itself
  await Node.findByIdAndDelete(nodeId);
}

const createFolder = async (folderName, parentId, creatorId) => {
  try {
    // console.log(folderName + parentId + creatorId);
    const newFolder = new Node();
    newFolder.name = folderName;
    newFolder.creator = creatorId;
    newFolder.isFolder = true;
    newFolder.parent = parentId;

    if (parentId) {
      const parentNode = await Node.findById(parentId);
      // console.log(newFolder);
      parentNode.children?.push(newFolder);
      await parentNode.save();
    }

    return await newFolder.save();
  } catch (error) {
    // console.log("Error In creating folder " + error);
  }
};

module.exports = router;
