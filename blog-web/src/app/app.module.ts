import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import httpInterceptorProviders from './core/common-utils/http-Interceptors';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaderLoginComponent } from './login/leader-login/leader-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaderRegisterComponent } from './login/leader-register/leader-register.component';
import { EditorMdCreateComponent } from './editor/editor-md-create/editor-md-create.component';
import { EditorMdConfirmComponent } from './editor/editor-md-confirm/editor-md-confirm.component';
// tslint:disable-next-line:jsdoc-format
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// tslint:disable-next-line:jsdoc-format
/** 配置 ng-zorro-antd 国际化 **/
import { NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { SafeUrlPipe } from './core/common-utils/safe-url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    LeaderLoginComponent,
    LeaderRegisterComponent,
    EditorMdCreateComponent,
    EditorMdConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    NzLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    LeaderLoginComponent,
    LeaderRegisterComponent,
    EditorMdConfirmComponent
  ],
  providers: [ httpInterceptorProviders, CookieService, {provide: NZ_I18N, useValue: zh_CN} ],

  bootstrap: [AppComponent],
})
export class AppModule { }
