import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../app/services/auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // kam next ir state?
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //Patikrinime ar vartotojas yra prisijunges
    //su pipe pagalba galime istraukti butent tai ko mums reikia
    return this.auth.user$.pipe(
      take(1), // kodel imame tik pirma useri? vis tiek jis bus vienas
      // kodel map jeigu imame tik viena user? kam is viso map jeigu galime tiesiog tap patikrinti?
      map(user => !!user), // <-- map to boolean (NOT NOT funkcija grazina True/False)
      tap(loggedIn => {
        if (!loggedIn) {
          //jeigu vartotojas neprisijunges, nukreipiame i login puslapi
          this.router.navigate(['/login']);
        } else {
          this.auth.loggedIn = loggedIn;
        }
      })
    )
  }
}