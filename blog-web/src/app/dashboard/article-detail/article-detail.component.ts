import { AfterViewInit, ViewChild, Component, Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import { SafeHtmlPipe } from './../../core/common-utils/safe-html.pipe';
declare var editormd: any;
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { formatDistance } from 'date-fns';
import { EventManager } from '@angular/platform-browser';
import baseUrl from './../../core/common-utils/baseurl';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})

export class ArticleDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  articleId: any;
  article: any;
  editor: any;
  inputValue = '';
  replyInputValue = '';
  loading = false;
  replyLoading = false;
  comments = [];
  listen: any;
  currentUrl: any;
  body: HTMLElement;
  globalComment: any;
  // tslint:disable-next-line:variable-name
  user_article_statistic: any;
  hrefTo: any;
  baseUrl =  baseUrl;
  @ViewChild('hrefTo') ahref: ElementRef;
  constructor(
    private blogApi: BlogApiService,
    private route: ActivatedRoute,
    private router: Router,
    private safeHtmlPipe: SafeHtmlPipe,
    private eventManger: EventManager

  ) { }
  ngOnDestroy(): void {
    this.listen(); // remove the addEventListener
  }
  ngAfterViewInit(): void {
    this.getArticleDetail();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.articleId = data.get('id');
    });
    const url = this.router.routerState.snapshot.url;
    this.currentUrl = url.split('#')[0];
    this.body = document.getElementsByTagName('body')[0];
    this.listen = this.eventManger.addEventListener(this.body, 'click', this.handleClick);
  }

  handleDigger(id) {
    this.blogApi.articleDigger({articleInfo: id}).subscribe(res => {
      if (res.code === 2) {
        this.article.digger_list.pop();
        this.article.digger_count -= 1;
      } else {
        this.article.digger_list.push(res.data);
        this.article.digger_count += 1;
      }
    });
  }

  handleCollection(id) {
    this.blogApi.articleCollection({articleInfo: id}).subscribe(res => {
      if (res.code === 2) {
        this.article.collection_list.pop();
        this.article.collection_count -= 1;
      } else {
        this.article.collection_list.push(res.data);
        this.article.collection_count += 1;
      }
    });
  }

  handleClick = () => {
    if (this.globalComment) {
      this.globalComment.show_reply = false;
      this.replyInputValue = '';
    }
  }

  updateCommentCount(c) {
    c === 'add' ? this.article.comment_count += 1 : this.article.comment_count -= 1;
  }

  handleSubmit() {
    const params = {
      topic_id: this.articleId,
      author_id: this.article.author._id,
      comment_content: this.inputValue
    };
    this.loading = true;
    this.blogApi.pushOneComment(params).subscribe(data => {
      this.loading = false;
      if (data.release === 'success') {
        this.updateCommentCount('add');
        this.comments.push(data.data);
        this.inputValue = '';
      }

    });
  }

  handleReplySubmit(evt: Event, data, last) {
    evt.stopPropagation();
    this.replyLoading = true;
    const params = {
      topic_id: this.articleId,
      author_id: this.article.author._id,
      comment_content: this.replyInputValue,
      reply_level: 2,
      reply_user_id: data.comment_user_id,
      reply_user_info: data.comment_user_id,
      parent_id: data.parent_id || data._id
    };
    this.blogApi.pushOneComment(params).subscribe(res => {
      this.replyLoading = false;
      if (res.release === 'success') {
        this.updateCommentCount('add');
        this.replyInputValue = '';
        last.comment_level2 = last.comment_level2 ? [...last.comment_level2, res.data] : [res.data];
        if (this.globalComment) {
          this.globalComment.show_reply = false;
        }
      }
    });
  }

  stop(evt: Event) {
    evt.stopPropagation();
  }

  showReply(evt: Event, item) {
    evt.stopPropagation();
    if (this.globalComment) {
      this.globalComment.show_reply = false;
    }
    item.show_reply = true;
    this.globalComment = item;
  }

  hidReply(evt, item) {
    item.show_reply = false;
  }

  showEditorMd(content) {
    editormd.markdownToHTML('editorMdView', {
      htmlDecode: 'style,script,iframe', // 可以过滤标签解码
      markdown: content,
      emoji: true,
      taskList: true,
      tex: true,               // 默认不解析
      flowChart: true,         // 默认不解析
      sequenceDiagram: true,
      baseUrl: this.currentUrl,  // 默认不解析
      tocContainer: '#article-toc'
    });
  }

  getAllComment() {
    this.blogApi.getAllcomments(`topic_id=${this.articleId}`).subscribe(res => {
      this.comments = res.data;
      this.route.queryParamMap.subscribe((data: any) => {
        if (data.has('toHref')) {
          this.ahref.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }
      });
    });
  }

  goUserPage(id) {
    this.router.navigate(['user', id]);
  }

  getArticleDetail() {
    this.blogApi.getArticleDetail(this.articleId).subscribe(res => {
      this.article = res.article;
      this.user_article_statistic = res.user_article.results[0].value;
      console.log(res.markDownStr);
      this.showEditorMd(res.article.markDownStr);
      this.getAllComment();
    });
  }
}
