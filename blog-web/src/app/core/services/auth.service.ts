import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from '../common-utils/session.storage.service';
// const merge = require('deepmerge');

// const aa = require('fs');
// const bb = require('lodash');

import * as deepmerge from 'deepmerge';
// const fs = require('fs');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserData: any = {};
  userIdenty: any;
  loginStatus = false;
  constructor(
    private cookService: CookieService,
    private router: Router,
    private sessionService: SessionStorageService,
  ) {
    this.currentUserData.user = this.sessionService.getObject('user') || null;
    if (this.currentUserData.user) { this.loginStatus = true; }
  }

  loginOut() {
    this.cookService.delete('csrf_token');
    console.log(2, this.cookService.get('csrf_token'));
    this.sessionService.remove('user');
    this.loginStatus = false;
    const url = this.router.routerState.snapshot.url;
    this.router.navigate(['/login'], {queryParams: {next: url}, replaceUrl: true});
  }

  setUserData(data) {
    this.sessionService.setObject('user', data);
    // this.currentUserData = merge(this.currentUserData, data);
    this.currentUserData.user = data;
    // this.sessionService.setObject('user', this.currentUserData);
    this.loginStatus = true;
  }

  // updateUserData(data) {
  //   console.log(this.currentUserData, data);
  //   this.currentUserData = merge(this.currentUserData, data);
  //   this.sessionService.setObject('user', this.currentUserData);
  //   return this.currentUserData;
  // }
}
