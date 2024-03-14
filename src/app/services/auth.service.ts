import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth'; // Import updateProfile from firebase/auth

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private afAuth: Auth) {}

  register(
    email: string,
    password: string,
    username: string,
    role: string
  ): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.afAuth, email, password)
        .then((credential) => {
          const user = credential.user;
          if (user) {
            return updateProfile(user, { displayName: username });
          } else {
            throw new Error('User not found after registration');
          }
        })
    );
  }

  sendEmailVerification() {
    const user = this.afAuth.currentUser;
    if (user) {
      return (user as any).sendEmailVerification();
    } else {
      return Promise.reject('No user logged in');
    }
  }

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
