import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EditorConfig } from './../editor.config';
import { ActivatedRoute, Router } from '@angular/router';
declare var editormd: any;
import * as $ from 'jquery';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-editor-md',
  templateUrl: './editor-md.component.html',
  styleUrls: ['./editor-md.component.scss']
})
export class EditorMdComponent implements OnInit, AfterViewInit {
  // private _oldMarkdownContent: string;
  articleId: string;
  editor: any;
  conf = new EditorConfig();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.articleId = data.get('id');
    });


    // console.log(this.route.params.subscribe(data => console.log(data)));
    // this.route.paramMap.pipe(
    //   switchMap(params => of (params))
    // ).subscribe((data) => {
    //   console.log(data.get('id'));
    // });

    console.log();
    // this.initMdData();
  }
  ngAfterViewInit(): void {
    this.initMdData();

    // 在這裏加載重新獲取
  }
  getHtml() {
    return  this.editor.getHTML();
  }

  getMarkdown() {
    return this.editor.getMarkdown();
  }

  initMdData() {
    this.createEditor();
    // this.editor.setMarkdown('ssss');
  }

  createEditor() {
    this.conf.markdown = 'sacaa';
    this.editor = editormd('articleId', this.conf); // 创建编辑器
   // 编辑器事件监听
    this.editor.on('change', () => {
      console.log(this.editor.state);
      // to do
    });
  }

}
