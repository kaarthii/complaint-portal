import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = 'http://localhost:8080/api/complaints';

  constructor(private http: HttpClient) { }

  getStudentComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student`);
  }

  getDepartmentComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/department`);
  }

  getAllComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  addComplaint(complaint: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, complaint);
  }

  updateComplaintStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, status, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}