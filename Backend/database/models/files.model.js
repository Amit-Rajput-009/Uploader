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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Node" }],
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
