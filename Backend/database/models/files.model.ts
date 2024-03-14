import { Document, Schema, model } from 'mongoose';

// Interface for child references
interface ChildNode {
  _id: Schema.Types.ObjectId; // Reference to child node using its ObjectId
  name: string; // Name of the child node
}

const nodeSchema = new Schema<Node>({
  name: { type: String, required: true }, // Name of the node (folder or file)
  url: {
    type: String,
    required: (doc: Node) => !doc.isFolder, // Required if not a folder (using a function)
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the creator user (using ObjectId)
  children: { type: [{ _id: Schema.Types.ObjectId, name: String }], default: [] }, // Array of objects with _id and name
  isFolder: { type: Boolean, required: true }, // Indicates whether it's a folder (true) or file (false)
  parent: { type: Schema.Types.ObjectId, ref: 'Node', default: null }, // Reference to the parent node (optional for top-level nodes)
});

export interface Node extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  url?: string;
  creator: Schema.Types.ObjectId;
  children: { _id: Schema.Types.ObjectId; name: string }[];
  isFolder: boolean;
  parent?: Schema.Types.ObjectId;
}

export const NodeModel = model<Node>('Node', nodeSchema);
