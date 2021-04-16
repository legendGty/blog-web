import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BlogApiService } from 'src/app/core/services/blog-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  tags = [];
  articles = [];
  users = [];
  constructor(
    private blogApi: BlogApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      tap((res: any) =>  {
        this.getAllSearchResult({query: res.query});
      })
    ).subscribe();
  }


  getAllSearchResult(params) {
    this.blogApi.searchAll(params)
      .pipe(
        tap(data => {
          this.tags = data.tag;
          this.articles = data.article;
          this.users = data.user;
        })
      )
      .subscribe();
  }

}
