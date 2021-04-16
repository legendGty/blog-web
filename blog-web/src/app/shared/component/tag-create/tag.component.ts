import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ViewContainerRef,
  TemplateRef, ViewRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subject } from 'rxjs';
import { BlogApiService } from 'src/app/core/services/blog-api.service';

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, AfterViewInit {
  @Input() color: string;
  @Input() background: string;
  form: FormGroup;
  @Output() sentColor = new EventEmitter();
  @ViewChild('tagContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('tag') tag: TemplateRef<any>;
  url = 'http://127.0.0.1:3000/common/upload_tag';
  loading = false;
  imgUrl: string;
  avatarUrl: any;
  subject = new Subject();
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private blogApi: BlogApiService
  ) { }
  ngAfterViewInit(): void {
    // console.log(this.tag, this.container);
    const tag: ViewRef = this.tag.createEmbeddedView(null);
    // this.container.clear();
    // this.container.insert(tag);
  }

  tagBackgroundChangeFun() {

  }

  tagColorChangeFun() {

  }

  // saveTag() {
  //   console.log(333);
  //   this.subject.next('start');
  // }
  saveTag() {
    if (this.imgUrl && this.form.valid) {
      const obj = {
        tag_category: 'article',
        tag_content: this.form.get('name').value,
        tag_color: this.color,
        tag_background: this.background,
        icon: this.imgUrl
      };
      this.blogApi.createArticleTag(obj).subscribe(res => {
        this.msg.success('标签创建成功');
      });
    }

  }
  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();

    // tslint:disable-next-line:no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  // tslint:disable-next-line:variable-name
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' ||  file.type === 'image/jpg';
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
      // tslint:disable-next-line:no-non-null-assertion
      // this.getBase64(file!.originFileObj!, (img: string) => {
      //     console.log(img);
      //     this.avatarUrl = img;
      //   });

      observer.next(isJpgOrPng && isLt5M);
      observer.complete();
      // this.subject.subscribe(res => {
      //   if (res === 'start') {
      //     observer.next(isJpgOrPng && isLt5M);
      //     observer.complete();
      //   }
      // });
    });
  }

  handleChange(info: { file: NzUploadFile,  event: NzUploadChangeParam}): void {
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
        // this.blogApi.updateUserInfo({headerImg: this.imgUrl}).subscribe(data => {
        //   this.msg.success('图片上传成功！');
        // });

        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  deleteColor(c) {
    if (c === 1) {
      this.color = '';
      return;
    }
    this.background = '';
  }
  tagPreView() {
    const tag: ViewRef = this.tag.createEmbeddedView(null);
    this.container.clear();
    this.container.insert(tag);
  }
  colorPickerChangeFun() {
    this.sentColor.emit(this.color);
  }

  ngOnInit() {
    if (!this.background) { this.background = '#713492'; }
    if (!this.color) { this.color = '#fff'; }
    this.form = this.fb.group({
      name: [
        null, [
          Validators.maxLength(10),
          Validators.required
        ]
      ]
    });
  }

}
