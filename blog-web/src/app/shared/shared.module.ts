import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './component/tag-create/tag.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { TagCardComponent } from './component/tag-card/tag-card.component';
import { EmojiPickComponent } from './component/emoji-pick/emoji-pick.component';
import { UserCardComponent } from './component/user-card/user-card.component';
import { Routes, RouterModule } from '@angular/router';

import { SafeUrlPipe } from '../core/common-utils/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    ColorPickerModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [TagComponent, TagCardComponent, EmojiPickComponent, UserCardComponent, SafeUrlPipe],
  exports: [
    TagComponent,
    TagCardComponent,
    EmojiPickComponent,
    UserCardComponent,
    SafeUrlPipe
  ],
  providers: [SafeUrlPipe]
})
export class SharedModule { }
