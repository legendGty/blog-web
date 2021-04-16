import { Component, OnInit } from '@angular/core';
import { BlogApiService } from 'src/app/core/services/blog-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category: any[];
  constructor(
    private blogApi: BlogApiService
  ) { }

  ngOnInit() {
    this.getArticleCategoryNav();
  }

  getArticleCategoryNav(): void {
    this.blogApi.getArticleCategory().subscribe(res => {
      this.category = res.data;
      console.log(res);
    });
  }

}
