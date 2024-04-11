import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector:'app-landing',
  template:'',
  })

export class LandingPage implements OnInit {
    constructor(private router:Router){}
    ngOnInit(): void {
     const role = localStorage.getItem("role");
      if (role == "admin"){
          this.router.navigate(['requests']);
      }
      else if (role == 'user') {
        this.router.navigate(['storage']);
      }
    }
}
