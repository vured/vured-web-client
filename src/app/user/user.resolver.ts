import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { UserDto } from 'src/app/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserDto> {

  constructor(
    private userService: UserService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDto> {
    return this.userService.getUser()
  }
}
