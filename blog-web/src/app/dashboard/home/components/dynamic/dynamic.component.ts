import { Component, OnInit } from '@angular/core';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
declare var twemoji: any;
import baseUrl from './../../../../core/common-utils/baseurl';
@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  el: HTMLElement;
  d: any;
  dynamicList: any[] = [];
  loading = true;
  baseUrl = baseUrl;
  defaultLinkImg = './../../../../../assets/images/defaultLink.svg';
  parse = twemoji.parse;
  constructor(
    private blogService: BlogApiService,
  ) { }

  getAllDynamic() {
    this.blogService.getAllDynamics().subscribe(data => {
      this.loading = false;
      this.dynamicList = data.data;
      console.log(333, this.dynamicList);
    });
  }

  refreshCurrentList(s) {
    if (s === 'success') {
      this.dynamicList = [];
      this.getAllDynamic();
      this.loading = true;
    }
  }
  goNewLink(url) {
    window.open(url);
  }
  ngOnInit() {

    this.getAllDynamic();


    // const emo = [
    //   '😀',
    //   '😁',
    //   '😂',
    //   '😃',
    //   '😄',
    //   '😅',
    //   '😆',
    //   '😇',
    //   '😈',
    //   '😉',
    //   '😊',
    //   '😋',
    //   '😌',
    //   '😍',
    //   '😎',
    //   '😏',
    // ];
    // const c = [];
    // const d = [];
    // emo.forEach(a => {
    //   const v = twemoji.convert.toCodePoint(a);
    //   c.push(v);
    //   d.push(twemoji.convert.fromCodePoint(v));
    // });
    // this.d = d;
    // console.log(c, d, String('😂'));
//    const aaa = twemoji.convert.toCodePoint('😂');

    // const aaa = twemoji.convert.fromCodePoint('1f1e8');
    // const bbb = twemoji.convert.toCodePoint('\ud83c\udf3d');
    // console.log(222, bbb,  aaa.toString(), twemoji.parse(aaa));
    // const emoji = twemoji.parse('1f1e8-1f1eb');
    // const emoji2 = twemoji.parse('\ud83c\udf3d');
    // console.log(emoji);
    // console.log(emoji2);

    // const el = document.querySelector('.emoji');
    // const ul = document.querySelector('li')[0];
    // const div = document.createElement('div');
    // div.textContent = 'I \u2764\uFE0F emoji!';
    // ul.textContent = '\ud83c\udf3d';
    // const ccc = twemoji.parse(div);
    // console.log(333, ccc);
    // el.innerHTML = emoji;

    // document.body.appendChild(el);
  }

}
