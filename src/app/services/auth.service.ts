import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from 'src/app/models/user'; // optional
import { Observable, of, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<User>;
  // kada kvieciamas konstruktorius? pvz kai login ar register tai kvieciami login ir register metodai.
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    // kodel negalime grazinti info apie user loginViaEmail metode? kodel cia?
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => { // o jeigu nenaudoti switchMap?
        console.log('authService constructor: ' + user.email);
          // Logged in
        if (user) {
          console.log('authService valueChanges(): '+this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe(res => console.log(res)));
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); // ka cia graziname? kodel valueChanges?
        } else {
          // Logged out
          return of(null);
        }
      }));
  }

  loginViaEmail(email, password){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (user) => {
        console.log('signInWithEmailAndPassword: ' + user);
      }
    );
  }

  //1.
  // sukurti register via email
  // naudoti formoje username, email, password.
  // signup firebase panel reikalauja tik 2 parametru email, password.
  signupViaEmail(form) {
    return this.afAuth.createUserWithEmailAndPassword(form.email, form.password)
    .then(result => {
        // kam sitas objektas jeigu sukureme class User?
        let user = {
          uid: result.user.uid, 
          email: result.user.email,
          username: form.username,
          signedVia: 'email'
        }
        return this.updateUserData(user);
      }
    )
  }

  signUpViaFacebook(){

  }

  //2. Forgot password
  //Naudoti su egzistuojanciu email.
  resetPassword(email) {
    return this.afAuth.sendPasswordResetEmail(email).then(() => {
      alert(`Password reset link has been sent to ${email}`);
    })
  }

  //funkcijos padesencios issiaiskinti vartotojo role
  public isAdmin(user: User){
    const role = ['admin'];
    return this.checkAuthorization(user, role);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    if (user['roles'] == undefined) return false;
    // console.log('user roles: '+user['roles']);
    for (const role of allowedRoles) {
      if ( user['roles'][role] ) {
        return true
      }
    }
    return false
  }


  //issaugome papildoma prisijungusio ar uzsiregistruojancio vartotojo informacija
  //musu duomenu bazeje
  private updateUserData(user) {
    // sukuriame lentele su jau prisijungusio varototojo unikaliu ID
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    //Papildoma informacija kuria norime irasyti
    // i duomenu baze apie musu vartotoja
    const data = { 
      uid: user.uid, 
      email: user.email, 
      username: user.username, 
      lastSeen: Date.now(),
      signedVia: user.signedVia,
      roles: {
        guest: true
      }
    } 
    //jeigu jau egzistavo toks vartotojas, mes nekuriame naujo
    // o sujungiame (merge:true) su pries tai egzistavusia informacija.
    return userRef.set(data, { merge: true });
  }
}
// sukurti UI admin
// sukurti image manage (istrinti, ikelti)
// articles (crud);

//calender.where(august, == , 'working_days')
// collection(ref => ref.where(a, ==, b))
//calander.add(pacient)

// scalinti...
// pacientu
// newsletteriu

// 2x darbo ka darytum su django 
//
