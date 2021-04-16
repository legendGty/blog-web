import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SocketService } from './core/services/socket.service';
import baseUrl from './core/common-utils/baseurl';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-web';
  user: any;
  baseUrl = baseUrl;
  constructor(
    private route: Router,
    private socketService: SocketService,
    private userService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUserData;
    console.log(this.user);
  }

  toNav() {
    this.route.navigate(['home']);
    console.log(this.user);
  }
}
