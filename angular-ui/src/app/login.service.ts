import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() {}

  hasPermission(permissions): boolean {
    return true
  }

}
