import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EditorConfig } from './../editor.config';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var editormd: any;
import * as $ from 'jquery';
import { EditorMdConfirmComponent } from '../editor-md-confirm/editor-md-confirm.component';
import { EditorConfirmService } from '../editor-md-confirm/editor-confirm.service';

@Component({
  selector: 'app-editor-md-create',
  templateUrl: './editor-md-create.component.html',
  styleUrls: ['./editor-md-create.component.scss']
})
export class EditorMdCreateComponent implements OnInit, AfterViewInit {
  editor: any;
  authorId: string;
  currentUrl: any;
  conf = new EditorConfig();
  constructor(
    private cookieService: CookieService,
    private editConfirm: EditorConfirmService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    const url = this.router.routerState.snapshot.url;
    this.currentUrl = url.split('#')[0];
    this.conf.baseUrl = this.currentUrl;
    this.initMdData();
  }
  getHtml() {
    return  this.editor.getHTML();
  }
  handleConfirm() {
    const params = {
      htmlStr: this.getHtml(),
      markDownStr: this.getMarkdown()
    };
    this.editConfirm.open(params).subscribe(res => {
      switch (res) {
        case 'success':
          this.router.navigate(['/home']);
          break;
      }
      console.log(res);
    });
  }
  getMarkdown() {
    return this.editor.getMarkdown();
  }

  initMdData() {
    this.createEditor();
    // this.editor.setMarkdown('ssss');
  }
  createEditor() {
    // this.conf.markdown = 'aaa';
    this.editor = editormd('authorId', this.conf); // 创建编辑器
   // 编辑器事件监听
    this.editor.on('change', () => {
      console.log(this.editor.state);
      // to do
    });
  }
  handleSave() {
    console.log(this.getHtml());
  }
  ngOnInit() {
    this.authorId = this.cookieService.get('csrf_token');
  }

}
