import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { Tag } from './../../../../shared/component/tag-card/tag';
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  tags: Tag[];
  constructor(
    private blogApi: BlogApiService,
    private userService: AuthService
  ) { }

  ngOnInit() {
    const id = this.userService.currentUserData.user._id || null;
    this.blogApi.getUserTags(id).subscribe(res => {
      this.tags = res.data;
      console.log(res);
    });
  }

}
