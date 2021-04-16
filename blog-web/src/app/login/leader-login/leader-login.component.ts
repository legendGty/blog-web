import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionStorageService } from 'src/app/core/common-utils/session.storage.service';

@Component({
  selector: 'app-leader-login',
  templateUrl: './leader-login.component.html',
  styleUrls: ['./leader-login.component.scss']
})
export class LeaderLoginComponent implements OnInit {
  form: FormGroup;
  @Input() params;
  @Output() handleLoading = new EventEmitter<string>();
  passwordVisible = false;
  userInputErr: boolean = null;
  pswInputErr: boolean = null;
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private api: BlogApiService,
    private toast: NzMessageService,
    private cookService: CookieService,
    private userService: AuthService,
    private sessionService: SessionStorageService
  ) { }
  validateAll() {
    const controls = this.form.controls;
    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty();
      controls[key].updateValueAndValidity();
    });
  }

  submit() {
    return new Promise(resolve => {
      this.validateAll();
      if (this.form.valid) {
          this.api.login(this.form.value).subscribe(res => {
          if (res.login === 'success') {
            this.cookService.set('csrf_token', res.token);
            this.userService.setUserData(res.user);
            this.toast.success(res.msg);
            this.modalRef.destroy('success');
          } else if (res.login === 'fail') {
            if (res.msg.indexOf('User Name Input Error') !== -1) {
              this.userInputErr = true;
              this.form.get('username').updateValueAndValidity();
            } else {
              this.pswInputErr = true;
              this.form.get('password').updateValueAndValidity();
            }
          }
          resolve('end');
        });
      }
    });
  }
  register() {
    this.modalRef.destroy('register');
  }
  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [
        Validators.maxLength(255),
        Validators.required,
        (ctrl: AbstractControl) => {
          return this.userInputErr ? { userInputErr: true } : null;
        }
      ]],
      password: [
        null,
        [
          Validators.required,
          (control: AbstractControl) => {
            return this.pswInputErr ? { pswInputErr: true } : null;
          }
        ]
      ]
    });

    this.form.get('username').valueChanges.subscribe(data => {
      if (data !==  this.form.value.username && this.userInputErr) {
        this.userInputErr = null;
        this.form.get('username').updateValueAndValidity();
      }
    });

    this.form.get('password').valueChanges.subscribe(data => {
      if (data !==  this.form.value.password && this.pswInputErr) {
        this.pswInputErr = null;
        this.form.get('password').updateValueAndValidity();
      }
    });
  }

}
