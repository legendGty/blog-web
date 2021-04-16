import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MineComponent } from './mine.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { PersonBlogComponent } from './components/person-blog/person-blog.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PostPersonInfoComponent } from './components/post-person-info/post-person-info.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MineComponent,
    children: [
      { path: '', pathMatch: 'full', component: PersonInfoComponent },
      { path: 'person-blog', component: PersonBlogComponent },
      { path: 'edit', component: PostPersonInfoComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MineComponent, PersonInfoComponent, PersonBlogComponent, PostPersonInfoComponent],
  exports: [RouterModule]
})
export class MineRoutingModule { }
