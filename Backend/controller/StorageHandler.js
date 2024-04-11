const express = require("express");
const router = express.Router();
const Node = require("../database/models/files.model");
const { verifyToken } = require("../middleware/middleware");
const mongoose = require('mongoose');


async function populateChildren(nodeId) {
    const node = await Node.findById(nodeId);
    if (!node) return null;

    const populatedNode = node.toObject();
    const populatedChildren = await Promise.all(
        populatedNode.children.map(async (childId) => {
            const child = await populateChildren(childId);
            return child;
        })
    );

    populatedNode.children = populatedChildren;
    return populatedNode;
}

router.get('/local', verifyToken, async (req, res) => {
    const user = req.user;

    try {
        if (!user || !user._id) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }

        const userDocs = await Node.find({ creator: user._id, parent: null });

        const populatedUserDocs = await Promise.all(
            userDocs.map(async (doc) => {
                const populatedDoc = await populateChildren(doc._id);
                return populatedDoc;
            })
        );

        res.json({ userDocs: populatedUserDocs });
    } catch (err) {
        // console.error("Error fetching and populating documents:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
