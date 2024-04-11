import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {}

  async getUserById(userId: string): Promise<any> {
    const url = `http://localhost:3000/user/${userId}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

}
