import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './components/all/all.component';
import { CreateComponent } from './components/create/create.component';
import { ManagerComponent } from './components/manager/manager.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { TagsComponent } from './tags.component';

const routes: Routes = [
  {
    path: '',
    component: TagsComponent,
    children: [
      { path: 'subscribe', pathMatch: 'full', component: SubscribeComponent },
      { path: 'all', component: AllComponent },
      { path: 'create', component: CreateComponent },
      { path: 'manager', component: ManagerComponent }
    ]
  },
];

export const TagRoutingRoutes = RouterModule.forChild(routes);
