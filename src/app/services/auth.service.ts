import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
import { registerForm } from 'src/constant';
// import { Auth, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
// import { updateProfile } from 'firebase/auth'; // Import updateProfile from firebase/auth

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getRole(){
    const role = localStorage.getItem('role');
    if (role === null){return 'user';} else{ return role;}
  }

  login(email:string,password:string): Observable<object> {
    const url = 'http://localhost:3000/login';
    return this.http.post<object>(url,{
      email:email,
      password:password
    }).pipe(catchError((error)=>this.handleError(error)));
  }
  
  register(myForm:registerForm): Observable<object> {
    const url = 'http://localhost:3000/register';
    return this.http.post<object>(url,{
     userEmail :myForm.userEmail,
     password: myForm.password,
     role : myForm.role,
     token : localStorage.getItem("token") || "",
    }).pipe(catchError((error)=>this.handleError(error)));
  }

  verifyUser(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:3000/verifyUser';
    return this.http.post<boolean>(url,{
    token:token
    }).pipe(catchError((error)=>this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred:';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
      window.alert(errorMessage);
    } else {
     
      errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
     
      switch (error.status) {
        case 400:
       
          errorMessage = 'All credentials are required!';
          window.alert(errorMessage);
          break;
        case 401:
       
          errorMessage = 'Unauthorized access. Please check Credentials.';
          window.alert(errorMessage);
          break;
        case 404:
         
          errorMessage = 'Resource not found.';
          window.alert(errorMessage);
          break;
       
        default:
       
          errorMessage = 'An error occurred. Please try again later.';
          window.alert(errorMessage);
          break;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
