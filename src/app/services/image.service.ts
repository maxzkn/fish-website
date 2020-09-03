import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { images } from '../models/images'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  uploadProgress = null;
  imageUrl: string = '';
  imageNameToDelete: string = '';
  imageIdToDelete: string = '';

  constructor(private afs: AngularFirestore, 
              private storage: AngularFireStorage) { }

  fetchImages(): Observable<any> {
    return of(images);
  }
  
  async uploadPicture(file) { // async.........
    let imageName = file.name.split('.').slice(0, -1).join(" ") + '_' + Date.now();
    const uploadTask: AngularFireUploadTask = this.storage.upload(`${imageName}`, file);

    //jeigu reikia progress bar upload
    uploadTask.percentageChanges().subscribe(change => {
      this.uploadProgress = change; // o kur deklaruotas uploadProgress?
      console.log(this.uploadProgress);
    });
    
    uploadTask.then(async res => {
      console.log('res.downloadURL: ' + res.downloadURL); // undefined
      // let url = res.downloadURL;
      console.log(this.storage.ref(`${imageName}`).getDownloadURL());
      this.storage.ref(`${imageName}`).getDownloadURL().subscribe(url => this.imageUrl = url);
      console.log(this.imageUrl); // buvo null, todel padariau setTimeout
      setTimeout(() => {
        this.saveImageNameInDatabase(this.imageUrl, imageName);
      }, 500);
    });
  }

  //gauna visas nuotraukas is duomenu bazes, 
  // pirma gauname url kur guli musu nuotraukos
  getAllImages(){
    return this.afs.collection('/images').valueChanges(); // kodel valueChanges?
  }
  
  //issaugome url, kurio pagalba mes galime atvaizduoti savo nuotrauka,
  //bei issaugome paveiksliuko pavadinima, kad ateityje galetume pagal pavadinima istrinti is direktorijos
  saveImageNameInDatabase(url, imageName){
    return this.afs.collection('/images').add({name: imageName, url: url});
  }

  //istrinti nuotrauka.. service istrina is storage ir is collection....
  deleteImageFromDatabase(imageSource) {
    console.log('hi')
    this.afs.collection('/images').valueChanges().
    subscribe(images => images.map(image => {
      if(image['url'] === imageSource) {
        console.log(image);
        this.imageNameToDelete = image['name'];
        this.storage.storage.ref(`${this.imageNameToDelete}`).delete();
      }
    }));

    this.afs.collection('/images', ref => ref.where('url', '==', `${imageSource}`)).
    snapshotChanges().subscribe(image => {
      console.log(image[0]);
      this.imageIdToDelete = image[0].payload.doc.id;
      this.afs.collection('/images').doc(this.imageIdToDelete).delete();
    });
  }
  // ar nereikia unsubscribint nuo visu subscribe kad isvengti memory leaks?
}
