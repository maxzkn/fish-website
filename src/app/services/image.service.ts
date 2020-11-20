import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  uploadProgress: Observable<number>;
  imageNameToDelete: string = '';
  imageIdToDelete: string = '';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async uploadPicture(file) {
    // async visada returnina Promise, bet jis cia nebutinas + nera await.
    // imagename_date formatas
    let imageName = file.name.split('.').slice(0, -1).join(' ') + '_' + Date.now();
    const uploadTask: AngularFireUploadTask = this.storage.upload(
      `images/${imageName}`,
      file
    );

    this.uploadProgress = uploadTask.percentageChanges();

    // return uploadTask
    //   .then(async (res) => {
    //     return res;
    //   })
    //   .then((snapshot) => {
    //     return snapshot.ref.getDownloadURL().then((downloadUrl) => {
    //       const imageUrl = downloadUrl;
    //       return this.saveImageNameInDatabase(imageUrl, imageName);
    //     });
    //   });

    // #1 variantas (nereikia async nes vis tiek nenaudojame await)
    uploadTask.then((res) => {
      return res.ref.getDownloadURL().then((downloadUrl) => {
        const imageUrl = downloadUrl;
        return this.saveImageNameInDatabase(imageUrl, imageName);
      });
    });

    // #2 variantas
    // uploadTask.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.storage.ref(`${imageName}`).getDownloadURL().subscribe((url) => {
    //       this.imageUrl = url;
    //       this.saveImageNameInDatabase(this.imageUrl, imageName);
    //       alert('Upload Successful');
    //     })
    //   })
    // ).subscribe();
  }

  //gauna visas nuotraukas is duomenu bazes,
  // pirma gauname url kur guli musu nuotraukos
  getAllImages(): Observable<any> {
    const images = this.afs.collection('images', (ref) =>
      ref.orderBy('date', 'desc')
    );
    return images
      .snapshotChanges()
      .pipe(
        map((changes) => {
          // console.log('changes', changes);
          return changes.map((doc) => {
            let photo = doc.payload.doc.data();
            // console.log('doc.data()', photo);
            return {
              id: doc.payload.doc.id,
              name: photo['name'],
              url: photo['url'],
            };
          });
        })
      );
  }

  //issaugome url, kurio pagalba mes galime atvaizduoti savo nuotrauka,
  //bei issaugome paveiksliuko pavadinima, kad ateityje galetume pagal pavadinima istrinti is direktorijos
  saveImageNameInDatabase(url, imageName) {
    return this.afs
      .collection('/images')
      .add({ name: imageName, url: url, date: new Date() });
  }

  deleteImageFromDatabase(imageName, id) {
    return this.storage.storage
      .ref(`/images/${imageName}`)
      .delete()
      .then(() => {
        return this.afs.collection('/images').doc(id).delete();
      });
  }

  //istrinti nuotrauka.. service istrina is storage ir is collection....
  // deleteImageFromDatabase(imageSource) {
  //   console.log('hi')

  //   this.afs.collection('/images').valueChanges().
  //   subscribe(images => images.map(image => {
  //     if(image['url'] === imageSource) {
  //       console.log(image);
  //       this.imageNameToDelete = image['name'];
  //       this.storage.storage.ref(`${this.imageNameToDelete}`).delete();
  //     }
  //   }));

  //   this.afs.collection('/images', ref => ref.where('url', '==', `${imageSource}`)).
  //   snapshotChanges().subscribe(image => {
  //     console.log('hey');
  //     console.log(image[0]);
  //     // cannot read property payload of undefined, nes kvieciamas 2 kartus - why?
  //     // problema buvo tame, kad mes naudojame subscribe on snapshotChanges ir kai istrina,
  //     // tai info pasikeicia ir tada kadangi subscribe padarytas tai vel iesko ir jau neranda.
  //     this.imageIdToDelete = image[0].payload.doc.id;
  //     this.afs.collection('/images').doc(this.imageIdToDelete).delete();
  //     console.log('done');
  //   });
  // }

  // ar nereikia unsubscribint nuo visu subscribe kad isvengti memory leaks?
  // atsakymas: servisuose geriau is viso niekada nesubscribint, o subscribint tik
  // komponentuose kurie naudoja servisa. Unsubskribint dazniausiai galima
  // ngOnDestroy() kai yra keiciamas view (tai ka vartotojas mato), pvz FB wall posts,
  // o pvz FB notifications kurie yra nav bar kuri visa laika matai galima neunsubscribint
}
