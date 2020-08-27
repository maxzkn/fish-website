import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user;
   
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user=>{
      this.user = user;
      // if(user){
      //   this.user = user;
      // }else{
      //   this.user = null;
      // }
    })

  }


  loginViaEmail(email, password){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (user) => {
        console.log(user);
      }
    );
  }

  //1.
  // sukurti register via email
  // naudoti formoje username, email, password.
  // signup firebase panel reikalauja tik 2 parametru email, password.


  //2. Forgot password
  //Naudoti su egzistuojanciu email.
}
