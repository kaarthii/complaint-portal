import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  selectedRole: 'student' | 'department' | 'admin' = 'student';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  selectRole(role: 'student' | 'department' | 'admin'): void {
    this.selectedRole = role;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.error = null;
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        const roleMap = {
            student: 'ROLE_STUDENT',
            department: 'ROLE_DEPT',
            admin: 'ROLE_ADMIN'
        };
        const expectedRole = roleMap[this.selectedRole];
        if (user.role === expectedRole) {
          switch (user.role) {
            case 'ROLE_STUDENT':
              this.router.navigate(['/student']);
              break;
            case 'ROLE_DEPT':
              this.router.navigate(['/department']);
              break;
            case 'ROLE_ADMIN':
              this.router.navigate(['/admin']);
              break;
          }
        } else {
          this.error = `Authentication successful, but you do not have permissions for the '${this.selectedRole}' role.`;
          this.authService.logout(); 
        }
      },
      error: (err) => {
        this.error = 'Invalid username or password.';
        console.error(err);
      }
    });
  }
}