import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LinkParentId, updateFolderId } from 'src/app/Store/node.action';
import { TreeNode } from 'src/constant';
import { AppState } from 'src/app/Store/app.state'; // Assuming AppState is defined in your store

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnInit {
  @Input() docs: any[] | undefined;
  @Output() selectedDoc = new EventEmitter<string>();

  currentID$!: Observable<string | null>; // Use ! to indicate that this will be initialized

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.currentID$ = this.store.pipe(select((state) => state.node.currentId));
  }

  selectListItem(itemId: string, parent?: string | null) {
    if (parent) {
      this.store.dispatch(LinkParentId({ pid: parent }));
    } else {
      this.store.dispatch(updateFolderId({ id: itemId }));
    }
  }

  toggleNode(node: TreeNode) {
    node.isExpanded = !node.isExpanded;
  }

  async downloadAndOpenFile(fileUrl: string) {
    try {
      const fileType = await this.getFileType(fileUrl);
      console.log('File type:', fileType);

      if (fileType === 'pdf') {
        // Handle PDF file type
        // Open PDF in a new tab
        window.open(fileUrl, '_blank');
      } else if (fileType === 'image') {
        // Handle image file type
        // Display image in the browser
        const imgElement = document.createElement('img');
        imgElement.src = fileUrl;
        document.body.appendChild(imgElement);
      } else {
        // Handle other file types (e.g., trigger download)
        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const tempLink = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        tempLink.href = objectUrl;
        tempLink.setAttribute('download', ''); // Specify that it should be downloaded
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

        // Open the downloaded file in a new tab (using the same object URL)
        window.open(objectUrl, '_blank');
        URL.revokeObjectURL(objectUrl);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  async getFileType(fileUrl: string): Promise<string> {
    const extension = fileUrl.split('.').pop()?.toLowerCase() || '';
    if (['pdf'].includes(extension)) {
      return 'pdf';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image';
    } else {
      return 'other';
    }
  }
}
