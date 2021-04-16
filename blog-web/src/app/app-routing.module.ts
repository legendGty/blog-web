import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './core/services/auth.guard';
import { EditorMdCreateComponent } from './editor/editor-md-create/editor-md-create.component';
import { EditorMdComponent } from './editor/editor-md/editor-md.component';
import { LeaderLoginComponent } from './login/leader-login/leader-login.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { SafeHtmlPipe } from './core/common-utils/safe-html.pipe';
import { ArticleDetailComponent } from './dashboard/article-detail/article-detail.component';
import { FormsModule } from '@angular/forms';
import { AutoFocusDirective } from './dashboard/article-detail/auto-focus.directive';
import { SharedModule } from './shared/shared.module';
import { DynamicComponent } from './dashboard/home/components/dynamic/dynamic.component';
import { SearchComponent } from './dashboard/search/search.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./dashboard/mine/mine.module').then(mod => mod.MineModule),
  },
  {
    path: 'game',
    loadChildren: () => import('./dashboard/games/games.module').then(mod => mod.GamesModule),
  },
  {
    path: 'release_article',
    component: EditorMdCreateComponent
  },
  {
    path: 'dynamic',
    component: DynamicComponent
  },
  {
    path: 'tag',
    loadChildren: () => import('./dashboard/tags/tags.module').then(mod => mod.TagsModule),  },
  {
    path: 'article/detail/:id',
    component: ArticleDetailComponent
  },
  {
    path: 'editor/:id',
    component: EditorMdComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    NgZorroAntdModule, ScrollingModule, CommonModule, SharedModule, FormsModule
  ],
  declarations: [SafeHtmlPipe, ArticleDetailComponent, AutoFocusDirective, DynamicComponent, SearchComponent],
  exports: [RouterModule, NgZorroAntdModule, ScrollingModule],
  providers: [SafeHtmlPipe]
})
export class AppRoutingModule { }
