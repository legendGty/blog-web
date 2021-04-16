import { Component, Input, OnInit } from '@angular/core';
import baseUrl from './../../../core/common-utils/baseurl';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: any;
  baseUrl = baseUrl;
  defaultImg = './../../../../assets/images/default-theme-login.jpg';
  constructor() { }

  ngOnInit() {
  }

}
