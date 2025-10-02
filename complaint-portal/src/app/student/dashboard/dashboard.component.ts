import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts'; 
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule], 
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  complaints: any[] = [];

  complaintsByStatus: any[] = [];
  view: [number, number] = [700, 300];
  colorScheme = 'vivid';
  legendPosition: LegendPosition = LegendPosition.Below;

  constructor(
    private complaintService: ComplaintService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.complaintService.getStudentComplaints().subscribe({
      next: (data) => {
        this.complaints = data.sort((a, b) => b.id - a.id);
        this.processDataForCharts(); 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("An error occurred:", err);
      },
    });
  }

  processDataForCharts(): void {
    const statusCounts = this.complaints.reduce((acc, complaint) => {
      const status = complaint.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    this.complaintsByStatus = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'IN_PROGRESS':
        return 'bg-warning text-dark';
      case 'COMPLETED':
        return 'bg-success';
      case 'REJECTED':
        return 'bg-danger';
      case 'SUBMITTED':
      default:
        return 'bg-primary';
    }
  }
}
