import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BlogApiService } from 'src/app/core/services/blog-api.service';
import emoji from './emoji-type';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var twemoji: any;
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { param } from 'jquery';

@Component({
  selector: 'app-emoji-pick',
  templateUrl: './emoji-pick.component.html',
  styleUrls: ['./emoji-pick.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmojiPickComponent implements OnInit, OnDestroy {
  @ViewChild(NzPopoverDirective, { static: false })  dirRef?: NzPopoverDirective;
  @Output() publishDynamic = new EventEmitter();
  codepoint = emoji.codePoint;
  emoji = [];
  linkParse = false;
  form: FormGroup;
  inputDomValue: any;
  inputValue = '';
  listen: any;
  loadingLink = false;
  loadingSubmit = false;
  body: HTMLElement;
  emojiExit = false;
  inputDom: HTMLElement;
  parse = twemoji.parse;
  linkCallData: any;
  defaultLinkImg = './../../../../assets/images/defaultLink.svg';
  constructor(
    private eventManger: EventManager,
    private blogService: BlogApiService,
    private fb: FormBuilder,
    // private dir: NzPopoverDirective
  ) { }


  ngOnInit() {
    this.body = document.getElementsByTagName('body')[0];
    this.listen = this.eventManger.addEventListener(this.body, 'click', this.handleDomClick);
    // console.log(twemoji.convert.fromCodePoint('1f1e8'));
    this.codepoint.forEach(a => {
      this.emoji.push(twemoji.convert.fromCodePoint(a));
    });
    this.inputDom = document.querySelector('.data-input');
    this.form = this.fb.group({
      url: [
        null, [
          Validators.required,
        ]
      ]
    });
    // console.log(this.inputDom, 888);
    // this.blogService.getPage().subscribe(res => {
    //   console.log(555, res);
    // });
  }



  getLinkUrl() {
    // this.dirRef.hide();
    this.loadingLink = true;
    this.blogService.linkUrl({ url: this.form.get('url').value }).subscribe(res => {
      console.log(res);
      this.linkCallData = res.data;
      this.linkParse = true;
      this.loadingLink = false;
      this.dirRef.hide();
    }, err => {
      this.loadingLink = false;
      this.linkParse = false;
      this.linkCallData = null;
    });
  }

  clearParseLink() {
    this.linkCallData = null;
    this.linkParse = false;
  }

  showEmojiPick(evt) {
    evt.stopPropagation();
    if (!this.emojiExit) {this.emojiExit = true; }
  }

  changeInputValue(evt) {
    // console.log(evt);
    console.log(this.inputDom.childNodes);
    this.inputValue = '';
    const nodes = this.inputDom.childNodes as NodeListOf<HTMLElement>;
    // const childNodes = dom.childNodes as NodeListOf<HTMLElement>
    // Array.from(nodes).forEach(node => {
    //   if (node.nodeType === 1) {
    //     this.inputValue += nodes.alt;
    //     attrs = node.attributes.alt.nodeValue;
    //   } else {
    //     this.inputValue += node.nodeValue;
    //   }
    // })

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === 1) {
        this.inputValue += (nodes[i] as HTMLImageElement).alt;
      } else {
        this.inputValue += nodes[i].nodeValue;
      }
    }
    console.log(this.inputValue);
    // const nodes = Array.prototype.slice.call(this.inputDom.childNodes, 0);
  }

  getInputValue() {
    this.inputValue = '';
    const nodes = this.inputDom.childNodes as NodeListOf<HTMLElement>;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === 1) {
        this.inputValue += (nodes[i] as HTMLImageElement).alt;
      } else {
        this.inputValue += nodes[i].nodeValue;
      }
    }

    return this.inputValue;
  }

  submit() {
    this.getInputValue();
    const params: any = {
      content: this.inputValue
    };
    if (this.linkParse && this.linkCallData) {
      params.link_parse_content = this.linkCallData;
    }
    this.loadingSubmit = true;
    this.blogService.publishDynamic(params).subscribe(res => {
      this.loadingSubmit = false;
      this.inputDom.innerHTML = '';
      this.clearParseLink();
      this.publishDynamic.emit('success');
      // console.log(res);
    });
  }

  ngOnDestroy(): void {
    console.log(333);
    this.listen(); // remove the addEventListener
  }

  handleDomClick = () => {
    this.emojiExit = false;
  }
  // parseDom(nodelist) {
  //   const objE = document.createElement('div');
  //   objE.innerHTML = nodelist;
  //   return objE.childNodes[0];
  // }
  handleInput(emi) {
    const imgStr = this.parse(emi);
    const objE = document.createElement('div');
    objE.innerHTML = imgStr;
    this.inputDom.appendChild(objE.childNodes[0]);
    objE.remove();
  }
}
