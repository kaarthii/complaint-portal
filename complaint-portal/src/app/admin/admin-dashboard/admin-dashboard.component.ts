import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Total Complaints', backgroundColor: '#3f51b5' }]
  };
  public barChartOptions: ChartConfiguration['options'] = { responsive: true };
  public groupedBarChartType: ChartType = 'bar';
  public groupedBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public groupedBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false } }
  };
  groupedComplaints: { [key: string]: any[] } = {};
  departmentNames: string[] = [];

  constructor(
    private complaintService: ComplaintService,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.complaintService.getAllComplaints().subscribe(data => {
      this.processData(data);
      this.cdr.detectChanges();
    });
  }

  processData(complaints: any[]): void {
    const deptCounts = complaints.reduce((acc, c) => {
      const dept = c.department || 'Unassigned';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});
    this.barChartData.labels = Object.keys(deptCounts);
    this.barChartData.datasets[0].data = Object.values(deptCounts);
    const depts = [...new Set(complaints.map(c => c.department || 'Unassigned'))];
    const statuses = [...new Set(complaints.map(c => c.status))];
    this.groupedBarChartData.labels = depts;
    this.groupedBarChartData.datasets = statuses.map(status => {
      return {
        label: status,
        data: depts.map(dept => 
          complaints.filter(c => (c.department || 'Unassigned') === dept && c.status === status).length
        ),
        backgroundColor: this.getChartColor(status)
      };
    });
    this.groupedComplaints = complaints.reduce((acc, c) => {
      const dept = c.department || 'Unassigned';
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(c);
      return acc;
    }, {});
    this.departmentNames = Object.keys(this.groupedComplaints);
  }
  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'IN_PROGRESS': return 'bg-warning text-dark';
      case 'COMPLETED': return 'bg-success';
      case 'REJECTED': return 'bg-danger';
      case 'SUBMITTED':
      default:
        return 'bg-primary';
    }
  }
  getChartColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'SUBMITTED': return '#0d6efd';
      case 'IN_PROGRESS': return '#ffc107';
      case 'COMPLETED': return '#198754';
      case 'REJECTED': return '#dc3545';
      default: return '#6c757d';
    }
  }
}
