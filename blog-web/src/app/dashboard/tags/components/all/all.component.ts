import { Component, OnInit } from '@angular/core';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { Tag } from './../../../../shared/component/tag-card/tag';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  tags: Tag[];
  constructor(
    private blogApi: BlogApiService
  ) { }

  ngOnInit() {
    this.blogApi.getAllTags().subscribe(res => {
      this.tags = res.data;
      console.log(res);
    });
  }
}
