import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editor-md-confirm',
  templateUrl: './editor-md-confirm.component.html',
  styleUrls: ['./editor-md-confirm.component.scss']
})
export class EditorMdConfirmComponent implements OnInit {
  @Input() params;
  form: FormGroup;
  categorys: any[];
  avatarUrl?: string;
  loading = false;
  selectCategory: string;
  imgUrl: string;
  url = 'http://127.0.0.1:3000/common/upload';
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private blogApi: BlogApiService,
    private modal: NzModalRef
  ) { }
  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    // tslint:disable-next-line:no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  // tslint:disable-next-line:variable-name
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLt5M = file.size! / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.msg.error('Image must smaller than 5MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt5M);
      observer.complete();
    });
  }

  handleChange(info: { file: NzUploadFile,  event: NzUploadChangeParam}): void {
    console.log(info);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // tslint:disable-next-line:no-non-null-assertion
        this.getBase64(info.file!.originFileObj!, (img: string) => {
        this.imgUrl = info.file.response.url;
        this.loading = false;
        this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
  checkChange(e) {
    console.log(e);
  }

  categoryClick(category) {
    this.categorys.forEach(i => i.checked = false);
    category.checked = true;
    this.selectCategory = category.category;
  }
  getArticleCategory() {
    this.blogApi.getArticleCategory().pipe(
      map((res) => {
        res.data.forEach(i => i.checked = false);
        return res;
      })
    ).
    subscribe((res: any) => {
      this.categorys = res.data;
      console.log(res);
    });
  }
  submit() {
    return new Promise(resolve => {
      if (!this.imgUrl) {
        this.msg.error('请上传封面图');
        resolve('end');
        return;
      } else if (!this.selectCategory) {
        this.msg.error('请选择文章分类');
        resolve('end');
      } else {
        const body = Object.assign({}, this.params, this.form.value, {category: this.selectCategory}, {headImgUrl: this.imgUrl});
        this.blogApi.releaseArticle(body).subscribe(res => {
          this.modal.destroy('success');
          resolve('end');
        });
      }

    });
  }
  validateAll() {
    const controls = this.form.controls;
    Object.keys(controls).forEach(key => {
      controls[key].markAsDirty();
      controls[key].updateValueAndValidity();
    });
  }
  ngOnInit() {
    console.log(this.params);
    this.getArticleCategory();
    this.form = this.fb.group({
      title: [
        null,
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      description: [
        null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ]
    });
  }

}
