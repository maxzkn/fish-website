import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { images } from '../models/images'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  fetchImages(): Observable<any> {
    return of(images);
  }
}
