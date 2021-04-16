import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { Tag } from './tag';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})

export class TagCardComponent implements OnInit {
  @Input() tag: Tag;
  userTags: any;
  constructor(
    private blogApi: BlogApiService,
    private msg: NzMessageService,
    private userService: AuthService
  ) { }

  ngOnInit() {
    this.userTags = this.userService.currentUserData.user.user_tags || [];
  }

  addTag(tag) {
    this.blogApi.userAddTags({ tags: [tag._id] }).subscribe(res => {
      if (res.add === 'success') {
        console.log(res);
        this.msg.success(res.msg);
        this.userService.setUserData(res.data);
        tag.concern_user_count += 1;
        this.userTags = res.data.user_tags;
      }
    });
  }

  CancelTag(tag) {
    this.blogApi.userRemoveTags({ tags: [tag._id] }).subscribe(res => {
      if (res.remove === 'success') {
        console.log(res);
        this.msg.success(res.msg);
        this.userService.setUserData(res.data);
        tag.concern_user_count -= 1;
        this.userTags = res.data.user_tags;
      }
    });
  }

}
