import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'uploader';

  base64File: string | null = null;

  onFileChange(event: any) {

    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('files', selectedFile);
    // console.log(selectedFile.name);

    // this.convertFileToBase64(selectedFile);

    fetch('http://localhost:3000/api/documents/localstorage/download/1711093746005-downloaded_file.pdf').then((response)=>{
      console.log(response);
    }).catch(error=>console.error(error));
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64String = reader.result?.toString();
      if (base64String) {
        this.base64File = base64String; // Store the base64 string in a component property
        const element = document.createElement('div');
        element.style.wordBreak = 'break-all';
        element.innerText = `${this.base64File}`;
        document.body.appendChild(element);
      }
    };
  }

  // data:image/png;base64,
  // data:text/csv;base64,
  // data:application/pdf;base64,
  // data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,

  sendBase64() {
    fetch('http://localhost:3000/api/documents/localstorage/createFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64: this.base64File!,
        fileName: 'file_1',
        userId: '65f3eec33b87ca97ee4415fe',
        parentId: '65fad16ed5fe84e2bd756980',
        isFolder: false,
      }),
    }).then((res) => {
      console.log(res);
    });
  }

  downloadFile() {
    this.base64File = this.base64File!.replace(
      'data:application/pdf;base64,',
      ''
    );
    const byteArray = new Uint8Array(
      atob(this.base64File)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    const file = new Blob([byteArray], { type: 'application/pdf;' });
    // const file = new Blob([byteArray],{type:''});
    const fileUrl = URL.createObjectURL(file);
    let filename = 'downloaded_file.pdf';
    let link = document.createElement('a');
    link.download = filename;
    link.target = '_blank';
    link.href = "http://localhost:3000/api/documents/localstorage/download/1711093746005-downloaded_file.pdf/pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    let fream = document.createElement('iframe');
    fream.src = fileUrl;
    (fream.style.width = '100%'), (fream.style.height = '900px');
    document.body.appendChild(fream);
  }
}
