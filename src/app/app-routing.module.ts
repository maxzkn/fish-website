import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ResetPswComponent } from './components/admin/reset-psw/reset-psw.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminImagesComponent } from './components/admin/admin-images/admin-images.component';
import { AdminArticlesComponent } from './components/admin/admin-articles/admin-articles.component';
import { AdminArticleNewComponent } from './components/admin/admin-articles/admin-article-new/admin-article-new.component';
import { AdminArticleEditComponent } from './components/admin/admin-articles/admin-article-edit/admin-article-edit.component';
import { ArticlesReadComponent } from './components/articles/articles-read/articles-read.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'resetpsw', component: ResetPswComponent },
  { path:'photos', component: PhotosComponent },
  { path:'articles', component: ArticlesComponent },
  { path:'articles/:id', component: ArticlesReadComponent },
  { path:'admin', children: [
    {
      path: 'photos',
      component: AdminImagesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'articles',
      component: AdminArticlesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'articles/article-new',
          component: AdminArticleNewComponent,
          canActivate: [AuthGuard]
    },
    {
      path: 'articles/edit/:id',
          component: AdminArticleEditComponent,
          canActivate: [AuthGuard]
    },
    {
      path: '',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
  ]},
  { path:'', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
