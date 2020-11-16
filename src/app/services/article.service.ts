import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Articles } from '../models/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  imageUrl: string = '';
  imgName: string = '';
  articleId = null;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  getAllArticles(): Observable<any> {
    const articles = this.afs.collection('articles', (ref) =>
      ref.orderBy('date', 'desc')
    );
    return articles.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((doc) => {
          let article = doc.payload.doc.data();
          return {
            id: doc.payload.doc.id,
            title: article['title'],
            body: article['body'],
            status: article['status'],
            source: article['source'],
            image: article['image'],
            imageName: article['imageName'],
            date: article['date'],
          };
        });
      })
    );
  }

  async saveArticleInDatabase(
    articleTitle: string,
    articleText: string,
    articleStatus: string,
    articleSource: string
  ) {
    await this.afs.collection('/articles').add({
      title: articleTitle,
      body: articleText,
      status: articleStatus,
      source: articleSource,
      image: this.imageUrl,
      imageName: this.imgName,
      date: new Date(),
    });
    this.router.navigate(['/admin/articles']);
  }

  deleteOldArticleImage(article) {
    return this.storage.storage.ref(`/images_article/${article.imageName}`).delete();
  }

  uploadArticleImage(file: File, title: string): Promise<any> {
    let imageName = file.name.split('.').slice(0, -1).join(' ') + '_' + title;
    this.imgName = imageName;

    const uploadTask: AngularFireUploadTask = this.storage.upload(`images_article/${imageName}`, file);

    return uploadTask.then((res) => {
      return res.ref.getDownloadURL().then((downloadUrl) => {
        this.imageUrl = downloadUrl;
      });
    });
  }

  selectArticle(id: any) {
    this.articleId = id;
  }

  editSelectedArticle(form: any, text: string) {
    const articleRef: AngularFirestoreDocument<any> = this.afs.doc(
      `articles/${this.articleId}`
    );

    if (this.imageUrl) {
      const data = {
        title: form.value.title,
        body: text,
        status: form.value.status,
        source: form.value.source,
        image: this.imageUrl,
        imageName: this.imgName,
        dateUpdated: new Date(),
      };
      return articleRef.set(data, { merge: true });
    } else {
      const data = {
        title: form.value.title,
        body: text,
        status: form.value.status,
        source: form.value.source,
        imageName: this.imgName,
        dateUpdated: new Date(),
      };
      return articleRef.set(data, { merge: true });
    }
    // return articleRef.set(data, { merge: true });
  }

  deleteSelectedArticle(id: any, imageName, title: string) {
    if (imageName) {
      return this.storage.storage
        .ref(`/images_article/${imageName}`)
        .delete()
        .then(() => {
          return this.afs.collection('/articles').doc(id).delete();
        });
    } else {
      return this.afs.collection('/articles').doc(id).delete();
    }
  }
}
