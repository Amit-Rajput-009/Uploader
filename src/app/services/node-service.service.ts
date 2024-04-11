import { TreeNode } from './../../constant/index';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeServiceService {
  Node : TreeNode[] = [];
  constructor(private http : HttpClient) { }

  async getAllNode(token:string): Promise<any> {
    const url = `http://localhost:3000/api/documents/local`;
    return fetch(url,{"headers":{"token":token}})
        .then(response => response.json())
        .then(data => {
            return data;
        });
  }
// There is no folder name add folder name and this is ready


async createNewFolder(parentId : string | null, FolderName: string): Promise<any> {
  const url = `http://localhost:3000/api/documents/localstorage/creatFolder`;
  const token = localStorage.getItem('token');

  const body = new URLSearchParams(); // Use URLSearchParams for form data
 if (parentId!=null) {
  body.append('parentId', parentId);
 }
  body.append('token', token!);
  body.append('folderName', FolderName);

  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Set content type correctly
    },
    body: body.toString() // Convert body to string for fetch
  })
  .then(response => response.json())
  .then(data => {
    return data;
  });
}
async deleteFolder(folderId : string, FolderName: string): Promise<any> {
  const url = `http://localhost:3000/api/documents/localstorage/deleteFolder`;
  const token = localStorage.getItem('token');

  const body = new URLSearchParams(); // Use URLSearchParams for form data
  body.append("folderId", folderId);
  body.append('token', token!);
  body.append('folderName', FolderName);

  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Set content type correctly
    },
    body: body.toString() // Convert body to string for fetch
  })
  .then(response => response.json())
  .then(data => {
    return data;
  });
}

async uploadFile(file:File,parentId:string | null){
  const url = `http://localhost:3000/api/documents/localstorage/createFile`;
  const token = localStorage.getItem('token');
  let fd = new FormData();
  fd.append("files", file);
  fd.append("token", token!)
  fd.append("parentId", parentId!)
  return fetch(url,{method:"POST",body:fd})
  .then((res)=>{return res.json();
  }).catch((err)=>{console.log(err)})
}


  // async  addFolder(name: string , token:string):Promise<TreeNode>{
  // }
}
