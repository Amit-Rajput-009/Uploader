import { createAction, props } from "@ngrx/store";

export const updateFolderId = createAction('[node] updateId', props<{ id: string | null; }>());
export const LinkParentId = createAction('[node] link parent Id',  props<{ pid: string | null; }>())