import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NodeServiceService } from 'src/app/services/node-service.service';
import { AppState } from 'src/app/Store/app.state';
import { updateFolderId } from 'src/app/Store/node.action';
import { fileCetegory, TreeNode } from 'src/constant';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.scss'],
})
export class LocalStorageComponent implements OnInit {
  nodes: TreeNode[] = [];
  @ViewChild('contentContainer') contentContainer!: ElementRef<HTMLDivElement>;
  
  currentId$!: Observable<string | null>;
  operation : 'Create' | 'Delete' | 'Upload'= 'Create';
  constructor(private nodeService: NodeServiceService,private store: Store<AppState>) {}
  // CreateFolder():void{
  //   let newNode : TreeNode = {"name":"New Folder","children":[],"isFolder":true,'isExpanded':false};
  //   this.nodes.push(newNode);
  //   console.log(this.nodes);
  //   console.log("Hello");
    
  // }

  parentFolderId: string | null = null;

  selectedFolder(folderId: string) {
    this.parentFolderId = folderId;
    console.log(this.parentFolderId);
  }

  isModalVisible = false;

  performOperation(Operation : 'Create'|'Delete'| 'Upload'): void {
    this.operation = Operation;
    this.toggleModal();
  }
  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  ngOnInit(): void {
    this.loadNodes();
    this.currentId$ = this.store.pipe(select(state => state.node.currentId));
  }
  ClearId(){
    this.store.dispatch(updateFolderId({ id: null }));
  }

  async loadNodes(): Promise<void> {
    try {
      const token = localStorage.getItem('token')!;
    let res = await this.nodeService.getAllNode(token);
 this.nodes = res.userDocs as TreeNode[]
    
      console.log("Parent data:- ",this.nodes);
    } catch (error) {
      console.error('Error loading nodes:', error);
    }
  }



// append newly created Folder,
appendChild(data: any) {
  console.log("Your data", data);
  if(data.parent === null){
    this.nodes = [...this.nodes ,{ ...data}];
    return;
  }
  const appendToNode = (node: any) => {
   
    if (data.parent === node._id) {
      node.children = [...node.children!, data];
      node.isExpanded = true;
      return; // Stop recursion if parent found
    } else if (node.children) {
      node.children.forEach((child:any) => appendToNode(child));
    }
  };

  this.nodes.forEach(rootNode => appendToNode(rootNode));
}


removeNode(data: any) {
  if (data.acknowledged) {
    // Assuming `res` is asynchronously retrieved from `currentId$` observable
    this.currentId$ = this.store.pipe(select(state => state.node.currentId));
    this.currentId$.subscribe(res => {
      if (res !== null) {
        // Find and remove the top-level node
        let index = this.nodes.findIndex((child: any) => child.parent === null && child._id === res);
        if (index !== -1) {
          this.nodes.splice(index, 1); // Remove from top-level nodes
        } else {
          // Recursive function to traverse and remove nodes
          const removeFromNode = (node: any) => {
            if (node.children) {
              const childIndex = node.children.findIndex((child: any) => child._id === res);
              if (childIndex !== -1) {
                node.children.splice(childIndex, 1); // Remove child node
                return; // Stop recursion if node found and removed
              } else {
                node.children.forEach((child: any) => removeFromNode(child)); // Continue recursion
              }
            }
          };
          // Traverse all root nodes to remove matching child node
          this.nodes.forEach(rootNode => removeFromNode(rootNode));
        }
      }
    }).unsubscribe();
  }
}






  searchQuery: string = '';
  selectedCategory: string = '';
  categories = fileCetegory;

  
  onSearch() {
    console.log(this.selectedCategory);
  }
  scrollToBottom(): void {
    try {
      this.contentContainer.nativeElement.scrollTop = this.contentContainer.nativeElement.scrollHeight;
    } catch (error) {
      console.error('Error scrolling to bottom:', error);
    }
  }
}
