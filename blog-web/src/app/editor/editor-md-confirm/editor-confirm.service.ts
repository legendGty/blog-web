import { Injectable, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { EditorMdConfirmComponent } from './editor-md-confirm.component';

@Injectable({
  providedIn: 'root'
})

export class EditorConfirmService {

constructor(
  private modalService: NzModalService
) { }
open(params: any): Observable<any> {
  const modal = this.modalService.create({
    nzTitle: 'Release',
    nzContent: EditorMdConfirmComponent,
    nzComponentParams: {
      params
    },
    nzWidth: '550',
    nzFooter: [
      {
        label: 'Close',
        onClick: () => modal.destroy(null)
      },
      {
        label: 'Release',
        type: 'primary',
        loading: false,
        // disabled: (instance: any) => instance.form.invalid,
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
