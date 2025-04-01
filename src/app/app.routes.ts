import { HomeComponent } from './home/home.component';
import { DetailComponent } from './details/details.component';
import { Routes } from '@angular/router';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailComponent,
    title: 'Home details'
  },
];

export default routeConfig;