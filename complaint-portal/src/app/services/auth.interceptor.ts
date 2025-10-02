import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getAuthHeader();

  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    return next(authReq);
  }

  return next(req);
};