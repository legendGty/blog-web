import { Component, OnInit } from '@angular/core';
import { BlogApiService } from 'src/app/core/services/blog-api.service';

// interface ItemData {
//   href: string;
//   title: string;
//   avatar: string;
//   description: string;
//   content: string;
// }

@Component({
  selector: 'app-commend',
  templateUrl: './commend.component.html',
  styleUrls: ['./commend.component.scss']
})

export class CommendComponent implements OnInit {
  data = [];

  constructor(
    private blogApi: BlogApiService
  ) {}
  ngOnInit() {
  }

}
