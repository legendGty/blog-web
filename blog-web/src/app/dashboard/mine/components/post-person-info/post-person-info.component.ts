import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { EventManager } from '@angular/platform-browser';
import baseurl from './../../../../core/common-utils/baseurl';

@Component({
  selector: 'app-post-person-info',
  templateUrl: './post-person-info.component.html',
  styleUrls: ['./post-person-info.component.scss']
})
export class PostPersonInfoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  avatarUrl = './../../../../../assets/images/default-theme-login1.jpg';
  loading = false;
  imgUrl: string;
  listen: any;
  body: HTMLElement;
  baseUrl = baseurl;
  // showEdit = true;
  user: any;
  showEdit = {
    work: true,
    skill: true,
    desc: true
  };
  url = 'http://127.0.0.1:3000/common/upload';
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private blogApi: BlogApiService,
    private eventManger: EventManager
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [
        {value: null, disabled: true}
      ],
      work: [
        null,
        Validators.maxLength(10)
      ],
      skill: [
        null,
        Validators.maxLength(20)
      ],
      desc: [
        null,
        Validators.maxLength(50)
      ]
    });
    this.body = document.getElementsByTagName('body')[0];
    this.listen = this.eventManger.addEventListener(this.body, 'click', this.handleDomClick);
    this.getUserInfo();
  }
  ngOnDestroy(): void {
    this.listen(); // remove the addEventListener
  }
  handleEdit(evt, inputElement, pro) {
    evt.stopPropagation();
    inputElement.focus();
    inputElement.select();
    this.showEdit[pro] = false;
  }

  inputFocus(prop) {
    this.showEdit[prop] = false;
  }

  handleSave(evt, prop) {
    evt.stopPropagation();
    if (this.form.get(prop).valid) {
      const body = {};
      body[prop] = this.form.value[prop];
      this.blogApi.updateUserInfo(body).subscribe(data => {
        Object.assign(this.user, body);
        this.showEdit[prop] = true;
        this.msg.success('用户信息修改成功');
        console.log(data);
      });
    }
  }

  getUserInfo() {
    this.blogApi.getUserInfo().subscribe(res => {
      console.log(res);
      this.user = res.data;
    });
  }

  handleDomClick = () => {
    console.log(222);
    Object.keys(this.showEdit).forEach(val => this.showEdit[val] = true);
  }
  CloseEdit(evt, from: any) {
    evt.stopPropagation();
    this.form.get(from).reset();
    this.showEdit[from] = true;
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
        console.log(img);
        this.imgUrl = info.file.response.url;
        this.loading = false;
        this.avatarUrl = img;
        this.blogApi.updateUserInfo({headerImg: this.imgUrl}).subscribe(data => {
          this.msg.success('图片上传成功！');
        });

        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
