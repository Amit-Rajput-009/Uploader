import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent {
  status: any;

  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.status = this.route.snapshot.paramMap.get('status');
  }

}
