import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit  {
  MSG = '';
  router = inject(Router)
  constructor(public authService: AuthService) {}

  ngOnInit() {
    if(localStorage.getItem('token')){
     this.router.navigate(['/'])
    }
  }


  onSubmit(myForm:any) {

    // console.log(myForm.value.email);
    
    this.authService.login(myForm.value.email.toLowerCase(), myForm.value.password.toLowerCase())
    .subscribe((response : any ) => {
     localStorage.setItem('token', response.token);
     localStorage.setItem('userId', response.userId);
     localStorage.setItem('role', response.role)
     this.router.navigate(['/'])
    });
  }
}
