import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit, OnDestroy {
  ds = new MyDataSource(this.blogApi);
  headerurl = './../../../../../assets/images/detault-theme-login.jpg';
  baseUrl = 'http://127.0.0.1:3000';
  hrefTo: HTMLElement;
  private destroy$ = new Subject();

  constructor(
    private blogApi: BlogApiService,
    private nzMessage: NzMessageService,
    private router: Router
  ) { }

  handleDigger(id, item: any) {
    console.log(this.ds);
    this.blogApi.articleDigger({articleInfo: id}).subscribe(res => {
      if (res.code === 2) {
        item.digger_list.pop();
        item.digger_count -= item.digger_count;
        console.log(222, item);
      } else {
        item.digger_list.push(res.data);
        item.digger_count += 1;
        console.log(111, item);
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
    constructor(private blogApi: BlogApiService) {
      super();
    }

    // connect(collectionViewer: CollectionViewer): Observable<ItemData[]> {
    //   this.subscription.add(
    //     collectionViewer.viewChange.subscribe(range => {
    //       console.log(range);
    //       const startPage = this.getPageForIndex(range.start);
    //       const endPage = this.getPageForIndex(range.end - 1);
    //       console.log(startPage, endPage);
    //       for (let i = startPage; i <= endPage; i++) {
    //         console.log('aaa');
    //         this.fetchPage(i);
    //       }
    //     })
    //   );
    //   return this.dataStream;
    // }
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
        console.log(this.cachedData.length);
        if (this.cachedData.length >= this.maxLength) {
          this.complete$.next();
          this.complete$.complete();
        } else {
          const endPage = this.getPageForIndex(range.end);
          this.fetchPage(endPage + 1);
        }
      });
    }
    // disconnect(): void {
    //   this.subscription.unsubscribe();
    // }
    private getPageForIndex(index: number): number {
      return Math.floor(index / this.pageSize);
    }

    private fetchPage(page: number): void {
      if (this.fetchedPages.has(page)) {
        return;
      }
      this.fetchedPages.add(page);
      this.blogApi.getAllArticle({ page })
        .subscribe(res => {
          console.log(res, this.cachedData);
          this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.data);
          console.log(this.cachedData);
          this.maxLength = res.total;
          this.dataStream.next(this.cachedData);
        });
    }
}

