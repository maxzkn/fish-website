import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/admin/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { ResetPswComponent } from './components/admin/reset-psw/reset-psw.component';
import { AdminBarComponent } from './components/ui/admin-bar/admin-bar.component';
import { AdminImagesComponent } from './components/admin/admin-images/admin-images.component';
import { AdminArticlesComponent } from './components/admin/admin-articles/admin-articles.component';
import { AdminArticleNewComponent } from './components/admin/admin-articles/admin-article-new/admin-article-new.component';

import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

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
    AdminArticlesComponent,
    AdminArticleNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    EditorModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    // { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
