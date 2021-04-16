import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { LeaderRegisterComponent } from './leader-register.component';

@Injectable({
  providedIn: 'root'
})
export class LeaderRegistService {

constructor(
  private modalService: NzModalService,
) { }
  open(): Observable<any> {
    const modal = this.modalService.create({
      nzTitle: 'Register',
      nzContent: LeaderRegisterComponent,
      nzComponentParams: {},
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
