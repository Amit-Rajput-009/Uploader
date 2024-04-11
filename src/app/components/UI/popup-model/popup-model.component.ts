import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeServiceService } from 'src/app/services/node-service.service';

@Component({
  selector: 'app-popup-model',
  templateUrl: './popup-model.component.html',
  styleUrls: ['./popup-model.component.scss']
})
export class PopupModelComponent implements OnInit {
  warning: boolean = false;
  folderName = '';
  selectedFile: File | undefined;

  @Input() FolderId: string | null = null;
  @Input() Operation!: "Create" | "Delete" | "Upload";
  @Output() closePopUp = new EventEmitter();
  @Output() appendChild = new EventEmitter<Object>();
  @Output() removeChild = new EventEmitter<Object>();

  constructor(private nodeService: NodeServiceService) {}

  ngOnInit(): void {
    console.log(this.FolderId);
  }

  onSubmit() {
    if (this.Operation === "Create" && this.folderName.trim() !== '') {
      this.nodeService.createNewFolder(this.FolderId, this.folderName).then((data) => {
        this.appendChild.emit(data);
        this.closePopUp.emit();
      });
    } else if (this.Operation === "Delete" && this.folderName.trim() !== '') {
      if (this.FolderId === null) {
        return;
      } else {
        this.nodeService.deleteFolder(this.FolderId!, this.folderName).then((data) => {
          this.removeChild.emit(data);
          this.closePopUp.emit();
        });
      }
    } else {
      this.warning = true;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (this.selectedFile) {
      // Call your service method to upload the selected file
      this.nodeService.uploadFile(this.selectedFile,this.FolderId).then((data) => {
        // Handle successful file upload response
        console.log(data);
        this.closePopUp.emit();
      }).catch((error:Error) => {
        // Handle file upload error
        console.error(error);
      });
    }
  }

  onClose() {
    this.closePopUp.emit();
  }
}
