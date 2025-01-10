import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageEnum } from 'src/base/enums/LocalStorageEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }


  Logout() {
    localStorage.removeItem(LocalStorageEnum.displayDirection);
    localStorage.removeItem(LocalStorageEnum.languageDirection);
    this.router.navigateByUrl('/authentication/login');
  }

  checkIfRoleExists(roles: string[]): boolean {
    var stringRoles: string = localStorage.getItem(LocalStorageEnum.roles);
    if (stringRoles) {
      var userRoles: string[] = JSON.parse(stringRoles);
      if (roles.some(x => userRoles.includes(x)))
        return true;
    }
    return false;
  }

}
