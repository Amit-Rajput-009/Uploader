const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  url: {
    type: String,
    validate: {
      validator: function (v) {
        return this.isFolder ? !v : !!v;
      },
      message: (props) => props.path + " is required for files but not allowed for folders"
    }
  },
  fileType: {
    type: String,
    validate: {
      validator: function (v) {
        return this.isFolder ? !v : !!v;
      },
      message: (props) => props.path + " is required for files but not allowed for folders"
    }
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  children: {
    type: [{
      name: { type: String, required: true }, // Name of the child node
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Node" } // Child node's ObjectId
    }],
    default: [],
    required: function () {
      return this.isFolder;
    }
  },
  isFolder: { type: Boolean, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', default: null }
});

nodeSchema.pre('save', function(next) {
  if (!this.isFolder) {
    this.children = undefined;
  }
  next();
});


const Node = mongoose.model("Node", nodeSchema);

module.exports = Node;
