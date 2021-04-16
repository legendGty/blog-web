import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { NzModalService, ModalButtonOptions } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { LeaderLoginComponent } from './leader-login.component';
import { BlogApiService } from './../../core/services/blog-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class LeaderLoginService {
  // toast: any;
loading: false;
pro: {
  promis: any
};

constructor(
  private modalService: NzModalService,
  private api: BlogApiService,
  private toast: NzMessageService
) { }

  open(): Observable<any> {
    const modal = this.modalService.create({
      nzTitle: 'Login',
      nzContent: LeaderLoginComponent,
      nzComponentParams: {
        params: this.pro
      },
      nzWidth: '500',
      nzFooter: [
        {
          label: 'Close',
          onClick: () => modal.destroy(null)
        },
        {
          label: 'Confirm',
          type: 'primary',
          loading: false,
          disabled: (instance: any) => instance.form.invalid,
          onClick(instance?: any): void {
            this.loading = true;
            instance.submit().then(res => {
              if (res === 'end') {
                this.loading = false;
              }
            });
          }
        }
      ],
    });
    return modal.afterClose;
  }
}
