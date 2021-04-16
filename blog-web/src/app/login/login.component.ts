import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LeaderLoginService } from './leader-login/leader-login.service';
import { LeaderRegistService } from './leader-register/leader-regist.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('vd') div: ElementRef;
  method = 0;
  pageType = 'init';
  constructor(
    private cookieService: CookieService,
    private leaderLoginService: LeaderLoginService,
    private leaderRegistService: LeaderRegistService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.div);
    }, 4000);

    // this.cookieService.set( 'csrf_token', 'ssss');
  }

  nav() {
    this.route.queryParamMap.subscribe((next: any) => {
      console.log(next.get(next), next.params.next);
      this.router.navigate([next.params.next]);
    });
  }

  choseLoginMethod(data) {
    this.method = data;
    if (data === 0) {
      this.pageType = 'login';
      this.leaderLoginService.open().subscribe(res => {
        switch (res) {
          case 'register':
              this.leaderRegistService.open().subscribe(regist => {
                switch (regist) {
                  case 'success':
                    this.nav();
                    break;
                  default:
                    this.pageType = 'init';
                    break;
                }
              });

              break;
          case 'success':
              this.nav();
              break;
          default :
            this.pageType = 'init';
            break;
        }
      });
    } else {

    }
  }

}
