import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'app-department-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule],
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css']
})
export class DepartmentDashboardComponent implements OnInit {
  complaints: any[] = [];
  complaintsByDay: any[] = [];
  complaintsByStatus: any[] = [];

  view: [number, number] = [600, 400];
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
  };

  constructor(
    private complaintService: ComplaintService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.complaintService.getDepartmentComplaints().subscribe(data => {
      this.complaints = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.processDataForCharts();
      this.cdr.detectChanges();
    });
  }

  processDataForCharts(): void {
    const dailyCounts = this.complaints.reduce((acc, complaint) => {
      if (!complaint.createdAt) return acc;
      const d = new Date(complaint.createdAt);
      const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    this.complaintsByDay = Object.keys(dailyCounts)
        .map(date => ({ name: date, value: dailyCounts[date] }))
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    const statusCounts = this.complaints.reduce((acc, complaint) => {
      const status = complaint.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    this.complaintsByStatus = Object.keys(statusCounts).map(status => ({ name: status, value: statusCounts[status] }));
  }

  onStatusChange(complaint: any, event: any): void {
    const newStatus = event.target.value;
    this.complaintService.updateComplaintStatus(complaint.id, newStatus).subscribe({
      next: (updatedComplaint) => {
        complaint.status = updatedComplaint.status;
        this.processDataForCharts();
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Failed to update status", err)
    });
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'IN_PROGRESS': return 'bg-warning text-dark';
      case 'COMPLETED': return 'bg-success';
      case 'REJECTED': return 'bg-danger';
      default: return 'bg-primary';
    }
  }

  getChartColor(name: string): string {
    switch (name.toUpperCase()) {
      case 'SUBMITTED': return '#0d6efd';
      case 'IN_PROGRESS': return '#ffc107';
      case 'COMPLETED': return '#198754';
      case 'REJECTED': return '#dc3545';
      default: return '#6c757d';
    }
  }
}

