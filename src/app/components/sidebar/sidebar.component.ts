import { Component, OnInit } from '@angular/core';
import { sidebarUserLinks, sidebarAdminLinks } from '../../../constant/index';
import { AuthService } from 'src/app/services/auth.service';
// import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {

  Navlinks: { icon: string; label: string; to: string }[] = [];
  constructor(private auth: AuthService, private route: Router) {
  }

  isLinkActive(linkPath: string): boolean {
    return this.route.url === linkPath;
}
  ngOnInit() {
    if(localStorage.getItem('token')){
        this.Navlinks = this.auth.getRole() === 'admin' ? sidebarAdminLinks :  sidebarUserLinks;
    }
  }

}
