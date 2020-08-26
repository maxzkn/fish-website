import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AppComponent } from './app.component'
import { PhotosComponent } from './components/photos/photos.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/admin/login/login.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

const routes: Routes = [
  { path:'home', component: AppComponent }, // kodel be situ neveikia scroll antra karta?
  { path:'', redirectTo:'home', pathMatch:'full' }, // kodel be situ neveikia scroll antra karta?
  { path:'login', component: LoginComponent },
  { path:'photos', component: PhotosComponent },
  { path:'articles', component: ArticlesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
