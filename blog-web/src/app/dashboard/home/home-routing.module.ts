import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CommendComponent } from './components/commend/commend.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ArticleComponent } from './components/article/article.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleCategoryComponent } from './components/article-category/article-category.component';
import { BlogApiService } from './../../core/services/blog-api.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', component: ArticleComponent},
      { path: ':category', pathMatch: 'full', component: ArticleCategoryComponent }
      // { path: 'dynamic', component: },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent, CommendComponent, ArticleComponent, ArticleCategoryComponent],
  exports: [RouterModule, ScrollingModule]
})
export class HomeRoutingModule {
}
