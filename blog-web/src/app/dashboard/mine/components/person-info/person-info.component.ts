import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import baseUrl from './../../../../core/common-utils/baseurl';
@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  showButton = true;
  userId: any;
  fileList: NzUploadFile[] = [];
  percent = 0;
  isCurrentAdmin = false;
  baseUrl = baseUrl;
  articleInfo: any = {};
  latestArticle: any;
  userInfo: any = {};
  nowDate = new Date();
  url = 'http://127.0.0.1:3000/common/upload';
  constructor(
    private msg: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private blogApi: BlogApiService,
    private userService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.userId = data.get('id');
    });
    const id = this.userService.currentUserData.user._id;
    this.isCurrentAdmin =  this.userId === id;
    this.getUserAllInfo(this.userId);
  }

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  getUserAllInfo(id) {
    this.blogApi.getUserAllInfo(id).subscribe(res => {
      console.log(res);
      if (res.data.articles.results && res.data.articles.results.length) {
        this.articleInfo = res.data.articles.results[0].value;
      }
      this.userInfo =  res.data.user;
      this.latestArticle = res.data.latestArticle;
    });
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }


  // beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
  //   return new Observable((observer: Observer<boolean>) => {
  //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //     if (!isJpgOrPng) {
  //       this.msg.error('You can only upload JPG file!');
  //       observer.complete();
  //       return;
  //     }
  //     const isLt2M = file.size! / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //       this.msg.error('Image must smaller than 2MB!');
  //       observer.complete();
  //       return;
  //     }
  //     observer.next(isJpgOrPng && isLt2M);
  //     observer.complete();
  //   });
  // };

  // private getBase64(img: File, callback: (img: string) => void): void {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result!.toString()));
  //   reader.readAsDataURL(img);
  // }

  handleChange(info: { file: NzUploadFile,  event: NzUploadChangeParam}): void {
    console.log(info);
    this.showButton = false;
    this.percent = info.file.percent;
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // this.getBase64(info.file!.originFileObj!, (img: string) => {
        this.loading = false;
        //   this.avatarUrl = img;
        // });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  goEditPage() {
    this.router.navigate(['edit'],  {relativeTo: this.route});
  }

  handleRemove() {
    this.showButton = true;
  }
}
