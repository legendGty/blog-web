import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-leader-register',
  templateUrl: './leader-register.component.html',
  styleUrls: ['./leader-register.component.scss']
})
export class LeaderRegisterComponent implements OnInit {
  form: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  userInputErr: boolean = null;
  pswInputErr: boolean = null;

  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private blogApi: BlogApiService,
    private toast: NzMessageService,
    private cookService: CookieService
  ) { }

  nameAsyncValid() {
    return (
      ctrl: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.blogApi.verify_name({username: ctrl.value}).pipe(
        map(data => (data.verify_pass === 'fail' ? { nameErr: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [
        null,
        {
          validators: [
            Validators.required,
          ],
          asyncValidators: this.nameAsyncValid(),
          updateOn: 'blur'
        },
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/),
        ]
      ],
      confirmPsw: [
        null,
        [
          Validators.required,
          (ctrl: AbstractControl) => {
            if (this.form) {
              const flag = ctrl.value !== this.form.controls.password.value;
              return flag ? { confirmPswErr: true } : null;
            }
            return null;
          }
        ]
      ]
    });
  }
  submit() {
    // this.validateAll();
    return new Promise(resolve => {
      if (this.form.valid) {
        this.blogApi.register(this.form.value).subscribe(res => {
          if (res.register === 'success') {
            this.cookService.set('csrf_token', res.token);
            this.toast.success(res.msg);
            this.modalRef.destroy('success');
            resolve('end');
          }
        });
      }
    });
  }
  // confirmValidator(control: AbstractControl) {
  //   const flag = control.value !== this.form.controls.password.value;
  //   return
  //   return flag ? { confirmPswErr: true } : null;
  // }
  // confirmValidator: FormControl

  validateAll() {
    const controls = this.form.controls;
    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty();
      controls[key].updateValueAndValidity();
    });
  }
}
