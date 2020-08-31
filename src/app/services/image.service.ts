import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { images } from '../models/images'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private afs: AngularFirestore, 
    private storage: AngularFireStorage) { }

  fetchImages(): Observable<any> {
    return of(images);
  }

  async uploadPicture(file) {
    let imageName = Date.now() + '.jpg';
    const uploadTask = this.storage.upload(
      `${imageName}`,
      file
    );

    //jeigu reikia progress bar upload
    // uploadTask.percentageChanges().subscribe(change => {
    //   this.uploadProgress = change;
    // });
 
    uploadTask.then(async res => {
      let url = res.downloadURL;
      this.saveImageNameInDatabase(url, imageName);
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
