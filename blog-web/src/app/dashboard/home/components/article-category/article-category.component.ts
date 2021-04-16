import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface ItemData {
  headImgUrl: string;
  description: string;
  title: string;
  author: Author;
  createdAt: string;
  comment_count: number;
  like: number;
  view_count: number;
}
interface Author {
  headerImg: string;
  userName: string;
}

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush

})

export class ArticleCategoryComponent implements OnInit, OnDestroy {
  currentCategory: any;
  ds: any;
  headerurl = './../../../../../assets/images/detault-theme-login.jpg';
  baseUrl = 'http://127.0.0.1:3000';
  hrefTo: HTMLElement;
  private destroy$ = new Subject();

  constructor(
    private blogApi: BlogApiService,
    private nzMessage: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  handleDigger(id, item: any) {
    this.blogApi.articleDigger({articleInfo: id}).subscribe(res => {
      if (res.code === 2) {
        item.digger_list.pop();
        item.digger_count -= item.digger_count;
      } else {
        item.digger_list.push(res.data);
        item.digger_count += 1;
      }
    });
  }

  goDetail(articleId, c?: any) {
    this.router.navigate(['/article/detail/', articleId ], {queryParams: { toHref: c }});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(res => {
      this.currentCategory = res.get('category');
      this.ds = new MyDataSource(this.blogApi, this.currentCategory);

    });

    this.ds
      .completed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.nzMessage.warning('Infinite List loaded all');
      });
  }
}

class MyDataSource extends DataSource<ItemData> {
  private pageSize = 10;
  private cachedData: ItemData[] = [];
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<ItemData[]>(this.cachedData);
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();
  private maxLength: number;
  private category: any;
    constructor(private blogApi: BlogApiService, category) {
      super();
      this.category = category;
    }

    completed(): Observable<void> {
      return this.complete$.asObservable();
    }

    connect(collectionViewer: CollectionViewer): Observable<ItemData[]> {
      this.setup(collectionViewer);
      return this.dataStream;
    }
    disconnect(): void {
      this.disconnect$.next();
      this.disconnect$.complete();
    }
    private setup(collectionViewer: CollectionViewer): void {
      this.fetchPage(1);
      collectionViewer.viewChange.pipe(takeUntil(this.complete$), takeUntil(this.disconnect$)).subscribe(range => {
        if (this.cachedData.length >= this.maxLength) {
          this.complete$.next();
          this.complete$.complete();
        } else {
          const endPage = this.getPageForIndex(range.end);
          this.fetchPage(endPage + 1);
        }
      });
    }
    private getPageForIndex(index: number): number {
      return Math.floor(index / this.pageSize);
    }

    private fetchPage(page: number): void {
      if (this.fetchedPages.has(page)) {
        return;
      }
      this.fetchedPages.add(page);
      this.blogApi.getAllArticle({ page, category: encodeURIComponent(this.category)})
        .subscribe(res => {
          this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.data);
          this.maxLength = res.total;
          this.dataStream.next(this.cachedData);
        });
    }
}
