import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { images } from '../models/images'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private afs: AngularFirestore, 
              private storage: AngularFireStorage) { }

  fetchImages(): Observable<any> {
    return of(images);
  }

  uploadProgress = null;
  imageUrl: string = null;
  
  async uploadPicture(file) {
    let imageName = Date.now() + '.jpg';
    const uploadTask: AngularFireUploadTask = this.storage.upload(`${imageName}`, file);

    //jeigu reikia progress bar upload
    uploadTask.percentageChanges().subscribe(change => {
      this.uploadProgress = change;
      console.log(this.uploadProgress);
    });
    
    console.log(typeof(uploadTask)); // why object but not promise?
    uploadTask.then(async res => {
      console.log('res: ' + res.downloadURL);
      // let url = res.downloadURL;
      console.log(this.storage.ref(`${imageName}`).getDownloadURL());
      this.storage.ref(`${imageName}`).getDownloadURL().subscribe(url => this.imageUrl = url);
      console.log(this.imageUrl);
      setTimeout(() => {
        this.saveImageNameInDatabase(this.imageUrl, imageName);
      }, 500);
    });
  }

  //gauna visas nuotraukas is duomenu bazes, 
  // pirma gauname url kur guli musu nuotraukos
  getAllImages(){
    return this.afs.collection('/images').valueChanges();
  }
  
  //issaugome url, kurio pagalba mes galime atvaizduoti savo nuotrauka,
  //bei issaugome paveiksliuko pavadinima, kad ateityje galetume pagal pavadinima istrinti is direktorijos
  saveImageNameInDatabase(url, imageName){
    return this.afs.collection('/images').add({name: imageName, url: url})
  }


  //istrinti nuotrauka.. service istrina is storage ir is collection....
  
}
