import { Component, inject } from '@angular/core';
import { Firestore,collection,addDoc, collectionData  } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
 
  MSG = '';
  router = inject(Router)
  constructor(public authService: AuthService,private fireStore: Firestore) {
    // this.authService.greet().subscribe((str:string)=>this.MSG=str);
    this.getData();
  }

  ngOnInit() {
    this.authService.greet()
      .subscribe((response : any ) => {
        this.MSG = JSON.stringify(response)
      });
  }
  email: string = '';
  password: string = '';
  role: string = 'admin';

  getData(){
    const collectionInstance = collection(this.fireStore,'users');
    collectionData (collectionInstance).subscribe(value => console.log(value)) 
  }

  onSubmit(myForm:any) {
    
    // console.log('Form Data:', myForm.value);
    // const collectionInstance = collection(this.fireStore,"users");
    // addDoc(collectionInstance,myForm.value).then(()=>{console.log("Data has been saved")}).catch((error:Error)=>{console.log(error)})

    this.authService.register("amitsinh.rajput@msbcgroup.com","abc@123","Amitsinh Rajput","Admin").subscribe(()=>{this.router.navigateByUrl('/')})
  }
}
