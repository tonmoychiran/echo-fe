import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppRoutes } from '../app.routes';

export const accessTokenGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getAccessToken()) {
    return true;
  }

  router.navigate([AppRoutes.LOGIN]);
  return false;
};
