import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  // notifications: Notification[] = [
  //   {'message':' Hey there! Your request for Uploading a file is sucuessfully received and will be processed as soon as possible'}
  // ];
  notifications: any[] = [
    {message:' Hey there! Your request for Uploading a file is sucuessfully received and will be processed as soon as possible'}
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch new notifications on component initialization
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    // this.notificationService.getNewNotifications().subscribe(
    //   (notifications: Notification[]) => {
    //     this.notifications = notifications;
    //   },
    //   (error) => {
    //     console.error('Error fetching notifications:', error);
    //   }
    // );
  }

  markAsRead(notification: Notification): void {
    // // Update notification status (e.g., mark as read)
    // notification.read = true; // Assuming Notification model has a 'read' property
    // this.notificationService.updateNotification(notification).subscribe(
    //   () => {
    //     // Notification updated successfully
    //     // Remove notification from the list (if needed)
    //     this.notifications = this.notifications.filter(n => n !== notification);
    //   },
    //   (error) => {
    //     console.error('Error marking notification as read:', error);
    //   }
    // );
  }
}
