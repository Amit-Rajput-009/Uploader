import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  name = "";
  res :any 
   async ngOnInit(): Promise<void> {
    const userId = localStorage.getItem('userId') || '';
    const role = localStorage.getItem("role");

    if (!verifyUser(role)) {
      this.router.navigate(['']);
      return;
    }

   await this.util.getUserById(userId)
    .then(data => {
      this.res = data;
    })
    .catch(error => {
      console.error('Error fetching user:', error);
    });

    this.name = this.res.email.split('@')[0];
  }
  constructor(private auth:AuthService,private util:UtilService, private router:Router){}

  onSubmit(myForm:any) {

    console.log(myForm.value);
    
    this.auth.register(myForm.value)
    .subscribe((response : any ) => {
      console.log(response.status);
      
      if (response.status == 201) {
        this.router.navigate(['/res', '201']);
     } else {
      this.router.navigate(['/res', '403']);
     }
    });
  }
}
 function verifyUser(role: string | null) : boolean{
 if(role === 'user'){
  return false;
 }else if(role === 'admin'){
  return true;
 }
 return false;
}

