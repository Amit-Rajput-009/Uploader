import { Component } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {
  // logs: LogEntry[] = [];
  logs: any[] = [];

  // constructor(private logService: LogService) { }

  ngOnInit(): void {
    // Fetch logs data on component initialization
    this.fetchLogs();
  }

  fetchLogs(): void {
    // this.logService.getLogs().subscribe(
    //   (logs: LogEntry[]) => {
    //     this.logs = logs;
    //   },
    //   (error) => {
    //     console.error('Error fetching logs:', error);
    //   }
    // );
  }
}
