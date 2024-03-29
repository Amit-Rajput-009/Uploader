import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
// import { Auth, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
// import { updateProfile } from 'firebase/auth'; // Import updateProfile from firebase/auth

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}


  greet(): Observable<string> {
    const url = 'http://localhost:3000/greet';
    return this.http.get<string>(url);
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}: ${error.body.error}`;
    }
    return throwError(errorMessage);
  }
}
