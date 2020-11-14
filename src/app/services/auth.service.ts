import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';

import { User } from 'src/app/models/user'; // optional
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // console.log(this.afAuth.authState.subscribe(a => console.log(a.uid, a.email)));
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // o jeigu nenaudoti switchMap? kam jis cia reikalingas?
        // Logged in
        if (user) {
          console.log('authService constructor: ' + user.email);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); // cia graziname info apie user?
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  loginViaEmail(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log('signInWithEmailAndPassword: ' + user);
      })
      .catch(function (error) {
        console.log('Firebase login error: ', error);
        let errorCode = error.code;
        let errorMessage = error.message;
        window.alert(
          `Error code: ${errorCode}, Error message: ${errorMessage}`
        );
      });
  }

  //1.
  // sukurti register via email
  // naudoti formoje username, email, password.
  // signup firebase panel reikalauja tik 2 parametru email, password.
  signupViaEmail(form) {
    return this.afAuth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((result) => {
        let user = {
          uid: result.user.uid,
          email: result.user.email,
          username: form.username,
          signedVia: 'email',
        };
        return this.updateUserData(user);
      })
      .catch(function (error) {
        console.log('Firebase signup error: ', error);
        let errorCode = error.code;
        let errorMessage = error.message;
        window.alert(
          `Error code: ${errorCode}, Error message: ${errorMessage}`
        );
      });
  } // tai createUserWithEmailAndPassword dar neissaugoja nauja user DB?

  //issaugome papildoma prisijungusio (?) ar uzsiregistruojancio vartotojo informacija
  //musu duomenu bazeje
  private updateUserData(user) {
    // sukuriame lentele su jau prisijungusio varototojo unikaliu ID
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    //Papildoma informacija kuria norime irasyti
    // i duomenu baze apie musu vartotoja
    const data = {
      uid: user.uid,
      email: user.email,
      username: user.username,
      lastSeen: Date.now(),
      signedVia: user.signedVia,
      roles: {
        guest: true,
      },
    };
    //jeigu jau egzistavo toks vartotojas, mes nekuriame naujo
    // o sujungiame (merge:true) su pries tai egzistavusia informacija. - kodel nenaudojame if ?
    return userRef.set(data, { merge: true });
  }

  logoutUser() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('You have been logged out.');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log('Log out error: ', error);
      });
  }

  //2. Forgot password
  //Naudoti su egzistuojanciu email.
  resetPassword(email) {
    return this.afAuth.sendPasswordResetEmail(email).then(() => {
      alert(
        `Password reset link for the user ${this.user$} has been sent to ${email}`
      );
    });
  }

  //funkcijos padesencios issiaiskinti vartotojo role
  public isAdmin(user: User) {
    const role = ['admin'];
    return this.checkAuthorization(user, role);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    if (user['roles'] == undefined) return false;
    // console.log('user roles: ' + user['roles']);
    for (const role of allowedRoles) {
      // kodel const, o ne let?
      if (user['roles'][role]) {
        // tas pats kas tikrinti user['roles'].admin? ir user['roles'].guest
        return true;
      }
    }
    return false;
  }
}
// sukurti UI admin
// sukurti image manage (istrinti, ikelti)
// articles (crud);

//calendar.where(august, == , 'working_days')
// collection(ref => ref.where(a, ==, b))
//calendar.add(pacient)

// scalinti...
// pacientu
// newsletteriu

// 2x darbo ka darytum su django
//
