import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard';

// Import all layouts and components
import { LayoutComponent as StudentLayout } from './student/layout/layout.component';
import { DashboardComponent as StudentDashboard } from './student/dashboard/dashboard.component';
import { ComplaintFormComponent } from './student/complaint-form/complaint-form.component';

import { LayoutComponent as DepartmentLayout } from './department/layout/layout.component';
import { DepartmentDashboardComponent } from './department/department-dashboard/department-dashboard.component';

import { LayoutComponent as AdminLayout } from './admin/layout/layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'student',
    component: StudentLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: StudentDashboard },
      { path: 'register', component: ComplaintFormComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'department',
    component: DepartmentLayout,
    canActivate: [authGuard],
    children: [
        { path: 'dashboard', component: DepartmentDashboardComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout, // Use the admin layout
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];