import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  user: any; // Define user variable

  constructor() { }

  ngOnInit(): void {
    // Simulate fetching user data (replace with actual API call)
    this.user = {
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      bio: 'Passionate web developer',
      phone: '123-456-7890'
    };
  }
}
