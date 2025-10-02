import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../../services/complaint.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-complaint-form',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.css'
})
export class ComplaintFormComponent {
  complaintForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private router: Router
  ) {
    this.complaintForm = this.fb.group({
      department: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.complaintForm.valid) {
      this.complaintService.addComplaint(this.complaintForm.value).subscribe(() => {
        this.router.navigate(['/student/dashboard']);
      });
    }
  }

}
