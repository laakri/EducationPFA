import { UsersService } from '../login/user.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private UsersService: UsersService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.UsersService.getIsAuth();
    const userRole = this.UsersService.getUserRole();
    if (!isAuth) {
      this.router.navigate(['/Homepage/View']);
      return false;
    }

    if (userRole !== 'admin') {
      this.router.navigate(['/Homepage/View']);
      return false;
    }
    return isAuth;
  }
}
