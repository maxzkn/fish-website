import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { environment } from 'src/environments/environment';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/admin/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from './components/admin/register/register.component';
import { ResetPswComponent } from './components/admin/reset-psw/reset-psw.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminBarComponent } from './components/ui/admin-bar/admin-bar.component';
import { AdminImagesComponent } from './components/admin/admin-images/admin-images.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    ServicesComponent,
    ContactsComponent,
    AboutMeComponent,
    PhotosComponent,
    ArticlesComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    ResetPswComponent,
    AdminBarComponent,
    AdminImagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
