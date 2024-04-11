import { createReducer, on } from "@ngrx/store";
import * as  NodeActions from "./node.action";

export interface FolderIdState {
    currentId: string | null; 
    parentFolder ?: string | null;
  }
  
  export const initialState: FolderIdState = {
    currentId: null,
    parentFolder : null
  };

  export const NodeReducer = createReducer(initialState,
    on(NodeActions.updateFolderId,(state,{id}) => ({...state,currentId : id})),
    on(NodeActions.LinkParentId, (state ,{pid})=>({...state,parentFolder:pid}))
  )