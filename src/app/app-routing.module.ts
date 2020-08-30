import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AppComponent } from './app.component'
import { PhotosComponent } from './components/photos/photos.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ResetPswComponent } from './components/admin/reset-psw/reset-psw.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'resetpsw', component: ResetPswComponent },
  { path:'photos', component: PhotosComponent },
  { path:'articles', component: ArticlesComponent },
  { path:'admin', children:[
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'photos',
      component: DashboardComponent
    },
    {
      path: 'articles',
      component: DashboardComponent
    },
  ]},
  { path:'', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
