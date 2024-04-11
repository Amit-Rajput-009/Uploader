import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent {
  pendingRequests: Request[] = [];
  acceptedRequests: Request[] = [];
  rejectedRequests: Request[] = [];
  otherRequests: Request[] = [];

  // constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    // Fetch requests data on component initialization
    this.fetchRequests();
  }

  fetchRequests(): void {
    // this.requestService.getMyRequests().subscribe(
    //   (requests: Request[]) => {
    //     this.pendingRequests = requests.filter(req => req.status === 'Pending');
    //     this.acceptedRequests = requests.filter(req => req.status === 'Accepted');
    //     this.rejectedRequests = requests.filter(req => req.status === 'Rejected');
    //   },
    //   (error) => {
    //     console.error('Error fetching requests:', error);
    //   }
    // );

    // this.requestService.getOtherRequests().subscribe(
    //   (otherRequests: Request[]) => {
    //     this.otherRequests = otherRequests;
    //   },
    //   (error) => {
    //     console.error('Error fetching other requests:', error);
    //   }
    // );
  }

  acceptRequest(request: Request): void {
    // // Handle accepting the request (e.g., update status)
    // request.status = 'Accepted';
    // this.requestService.updateRequest(request).subscribe(() => {
    //   // Request accepted successfully
    //   // Remove request from otherRequests array
    //   this.otherRequests = this.otherRequests.filter(req => req !== request);
    // });
  }

  rejectRequest(request: Request): void {
    // // Handle rejecting the request (e.g., update status)
    // request.status = 'Rejected';
    // this.requestService.updateRequest(request).subscribe(() => {
    //   // Request rejected successfully
    //   // Remove request from otherRequests array
    //   this.otherRequests = this.otherRequests.filter(req => req !== request);
    // });
  }
}
