import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import { TagRoutingRoutes } from './tag-routing.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { AllComponent } from './components/all/all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './components/create/create.component';


@NgModule({
  imports: [
    CommonModule,
    TagRoutingRoutes,
    NgZorroAntdModule,
    SharedModule
  ],
  declarations: [TagsComponent, AllComponent, SubscribeComponent, CreateComponent]
})
export class TagsModule { }
